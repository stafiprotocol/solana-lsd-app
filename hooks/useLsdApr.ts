import { useCallback, useEffect } from "react";
import { setRate, updateLsdEthRate } from "redux/reducers/LstSlice";
import { RootState } from "redux/store";
import { useAppDispatch, useAppSelector } from "./common";
import { useAppSlice } from "./selector";
import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { solanaPrograms } from "config";
import { IDL, LsdProgram } from "config/idl/lsd_program";
import { useAnchorLsdProgram } from "./useAnchorLsdProgram";
import { PublicKey } from "@solana/web3.js";
import { useDebouncedEffect } from "./useDebouncedEffect";
import { chainAmountToHuman } from "utils/numberUtils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDefaultApr } from "utils/configUtils";
import { useConnection } from "@solana/wallet-adapter-react";
import { isDev } from "config/env";

export function useLsdApr() {
  const dispatch = useAppDispatch();
  const { updateFlag } = useAppSlice();
  const { connection } = useConnection();
  const anchorLsdProgram = useAnchorLsdProgram();

  const lstRate = useAppSelector((state: RootState) => {
    return state.lst.rate;
  });

  const aprResult: UseQueryResult<number> = useQuery({
    queryKey: ["GetLstApr", !!anchorLsdProgram],
    staleTime: 120000,
    queryFn: async () => {
      if (!anchorLsdProgram) {
        return getDefaultApr();
      }

      let apr = getDefaultApr();
      // const eraSeconds = 100;
      // const eventLength = Math.round((7 * 24 * 3600) / eraSeconds);
      const eventLength = 3;

      const stakeManagerAccount =
        await anchorLsdProgram.account.stakeManager.fetch(
          new PublicKey(solanaPrograms.stakeManagerProgramId)
        );

      const currentEpoch = Number(stakeManagerAccount.latestEra.toString());

      const epochRates = stakeManagerAccount.eraRates;
      if (epochRates.length > eventLength) {
        const beginRate = Number(
          chainAmountToHuman(
            epochRates[epochRates.length - eventLength - 1].rate.toString()
          )
        );
        const endRate = Number(
          chainAmountToHuman(epochRates[epochRates.length - 1].rate.toString())
        );

        const beginEpoch = currentEpoch - eventLength - 1;
        const endEpoch = currentEpoch - 1;

        const epochInfo = await connection.getEpochInfo();
        const slotsInEpoch = epochInfo.slotsInEpoch;
        const beginSlot = slotsInEpoch * beginEpoch;
        const endSlot = slotsInEpoch * endEpoch;
        console.log({ beginSlot });
        console.log({ endSlot });

        const beginBlockTime = await connection
          .getBlockTime(beginSlot)
          .catch((err) => {});
        const endBlockTime = await connection
          .getBlockTime(endSlot)
          .catch((err) => {});

        console.log({ beginBlockTime });
        console.log({ endBlockTime });

        let blockTimeDiff = isDev() ? 577700 : 57770;
        if (beginBlockTime && endBlockTime) {
          blockTimeDiff = endBlockTime - beginBlockTime;
        }

        console.log({ beginRate });
        console.log({ endRate });
        if (beginRate !== 1 && endRate !== 1) {
          apr =
            (365.25 * 24 * 60 * 60 * (endRate - beginRate)) /
            beginRate /
            blockTimeDiff;
        }
      }

      return apr;
    },
  });

  return aprResult.data;
}
