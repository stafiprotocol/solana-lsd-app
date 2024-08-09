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

export function useLsdRate() {
  const dispatch = useAppDispatch();
  const { updateFlag } = useAppSlice();

  const anchorLsdProgram = useAnchorLsdProgram();

  const lstRate = useAppSelector((state: RootState) => {
    return state.lst.rate;
  });

  const updateData = useCallback(async () => {
    if (!anchorLsdProgram || (lstRate && !isNaN(Number(lstRate)))) {
      return;
    }

    const stakeManagerAccount =
      await anchorLsdProgram.account.stakeManager.fetch(
        new PublicKey(solanaPrograms.stakeManagerProgramId)
      );

    // console.log({ stakeManagerAccount });
    // console.log(stakeManagerAccount.lsdTokenMint.toString());

    const rate = chainAmountToHuman(stakeManagerAccount.rate.toString());
    // console.log({ rate });
    dispatch(setRate(rate));
  }, [anchorLsdProgram, dispatch, lstRate]);

  useDebouncedEffect(
    () => {
      updateData();
    },
    [updateData],
    1000
  );

  return lstRate;
}
