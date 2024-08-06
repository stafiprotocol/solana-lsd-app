import { useEffect, useMemo, useState } from "react";
import { RootState } from "redux/store";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";
import { useAppSelector } from "./common";
import { useAppSlice } from "./selector";
import { useWalletAccount } from "./useWalletAccount";
import { chainAmountToHuman, formatScientificNumber } from "utils/numberUtils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useAnchorLsdProgram } from "./useAnchorLsdProgram";
import { solanaPrograms } from "config";
import { PublicKey } from "@solana/web3.js";
import { solanaEpochToHours } from "utils/timeUtils";
import { WithdrawInfo } from "interfaces/common";

export function useEthUnclaimedWithdrawls() {
  const { updateFlag } = useAppSlice();
  const { metaMaskAccount } = useWalletAccount();

  const [overallAmount, setOverallAmount] = useState<string>();
  const [claimableAmount, setClaimableAmount] = useState<string>();

  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const anchorLsdProgram = useAnchorLsdProgram();

  const rate = useAppSelector((state: RootState) => {
    return state.lst.rate;
  });

  const willReceiveAmount = useMemo(() => {
    if (!rate || isNaN(Number(rate))) {
      return "--";
    }
    return Number(rate) * Number(claimableAmount) + "";
  }, [rate, claimableAmount]);

  const withdrawInfoResult: UseQueryResult<WithdrawInfo | undefined> = useQuery(
    {
      queryKey: [
        "GetWithdrawInfo",
        !!anchorLsdProgram || "",
        publicKey?.toString() || "",
      ],
      staleTime: 120000,
      enabled: !!anchorLsdProgram && !!publicKey,
      queryFn: async () => {
        if (!anchorLsdProgram || !publicKey) {
          return {};
        }
        try {
          const stakeManagerAccount =
            await anchorLsdProgram.account.stakeManager.fetch(
              new PublicKey(solanaPrograms.stakeManagerProgramId)
            );

          const unbondingDuration = Number(
            stakeManagerAccount.unbondingDuration.toString()
          );

          const epochInfo = await connection.getEpochInfo();

          const accounts = await connection.getParsedProgramAccounts(
            new PublicKey(solanaPrograms.lsdProgramId),
            {
              filters: [
                { dataSize: 88 },
                {
                  memcmp: {
                    offset: 8,
                    bytes: solanaPrograms.stakeManagerProgramId,
                  },
                },
                {
                  memcmp: {
                    offset: 40,
                    bytes: publicKey.toString(),
                    // bytes: "DRtThFS61F2WhHkT5woKFhNTtiLHDjss3aykKQkmZ7wy",
                  },
                },
              ],
            }
          );
          console.log({ accounts });

          let overallWithdrawAmount = 0;
          let withdrawableAmount = 0;
          let remainingUnlockEpoch = 0;

          const accountRequests = accounts.map((account) => {
            return (async () => {
              try {
                const unstakeAccount =
                  await anchorLsdProgram.account.unstakeAccount.fetch(
                    account.pubkey
                  );
                // console.log("xx", unstakeAccount);
                // console.log("xx", (unstakeAccount as any).amount.toString());
                // console.log("xx", (unstakeAccount as any).createdEpoch.toString());

                const currentAmount = chainAmountToHuman(
                  (unstakeAccount as any).amount.toString()
                );

                if (
                  Number(epochInfo.epoch) >=
                  Number((unstakeAccount as any).createdEpoch) +
                    unbondingDuration
                ) {
                  withdrawableAmount += Number(currentAmount);
                } else {
                  const needWaitEpoch =
                    Number((unstakeAccount as any).createdEpoch) +
                    unbondingDuration -
                    Number(epochInfo.epoch);

                  if (remainingUnlockEpoch === 0) {
                    remainingUnlockEpoch = needWaitEpoch;
                  } else {
                    remainingUnlockEpoch = Math.min(
                      remainingUnlockEpoch,
                      needWaitEpoch
                    );
                  }
                }

                overallWithdrawAmount += Number(currentAmount);
              } catch {}
            })();
          });

          await Promise.all(accountRequests);

          // console.log({ overallWithdrawAmount });

          console.log({
            avaiableWithdraw: withdrawableAmount + "",
            overallAmount: overallWithdrawAmount + "",
            remainingTime:
              solanaEpochToHours(remainingUnlockEpoch) * 3600 * 1000,
            ledgerAvaible: true,
          });

          return {
            overallAmount: overallWithdrawAmount + "",
            claimableAmount: withdrawableAmount + "",
            willReceiveAmount: "",
            claimableWithdrawals: [],
            remainingTime:
              solanaEpochToHours(remainingUnlockEpoch) * 3600 * 1000,
            // ledgerAvaible: true,
          };
        } catch (err: any) {
          console.log({ err });
        }
      },
    }
  );

  return withdrawInfoResult.data;
}
