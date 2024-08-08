import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { solanaPrograms } from "config";
import { useEffect, useState } from "react";
import { chainAmountToHuman } from "utils/numberUtils";
import { getSplTokenAccount } from "utils/solanaUtils";
import { useAppDispatch } from "./common";
import { useAppSlice } from "./selector";

export function useBalance() {
  const { updateFlag } = useAppSlice();
  const dispatch = useAppDispatch();
  const { connection } = useConnection();
  const { publicKey: userPublicKey } = useWallet();

  const [solBalance, setSolBalance] = useState<string>();
  const [lsdBalance, setLsdBalance] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        // const connection = new Connection(getSolanaRestRpc(), {
        //   wsEndpoint: getSolanaWsRpc(),
        //   commitment: SOLANA_COMMITMENT,
        // });
        if (!userPublicKey) {
          return;
        }

        const balance = await connection.getBalance(userPublicKey);
        let solBalance = chainAmountToHuman(balance);
        // console.log({ solBalance });
        setSolBalance(balance ? solBalance : "0");
      } catch (err) {
        // dispatch(setSolanaBalance('--'));
        setSolBalance(undefined);
      }
    })();
  }, [userPublicKey, connection, updateFlag]);

  useEffect(() => {
    (async () => {
      try {
        if (!userPublicKey) {
          return;
        }

        let balance = undefined;
        const tokenAccountPubkey = await getSplTokenAccount(
          connection,
          userPublicKey.toString(),
          // "DRtThFS61F2WhHkT5woKFhNTtiLHDjss3aykKQkmZ7wy",
          solanaPrograms.lsdTokenMint
        );
        if (tokenAccountPubkey) {
          const tokenAccountBalance = await connection.getTokenAccountBalance(
            tokenAccountPubkey.pubkey
          );
          // console.log(tokenAccountBalance.value);
          if (tokenAccountBalance && tokenAccountBalance.value) {
            balance = tokenAccountBalance.value.uiAmount + "";
          }
        } else {
          balance = "0";
        }
        setLsdBalance(balance);
      } catch (err) {
        setLsdBalance(undefined);
      }
    })();
  }, [userPublicKey, connection, updateFlag]);

  // const { lsdBalance } = useAppSelector((state: RootState) => {
  //   return {
  //     lsdBalance: state.lst.balance,
  //   };
  // });

  // useEffect(() => {
  //   if (updateFlag) {
  //     dispatch(updateLsdEthBalance());
  //   }
  // }, [dispatch, updateFlag]);

  return {
    balance: solBalance,
    lsdBalance,
  };
}
