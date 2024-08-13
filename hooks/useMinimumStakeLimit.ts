import { useEffect, useState } from "react";
import { useAppSlice } from "./selector";
import { useAnchorLsdProgram } from "./useAnchorLsdProgram";
import { solanaPrograms } from "config";
import { chainAmountToHuman } from "utils/numberUtils";

export function useMinimumStakeLimit() {
  const { updateFlag } = useAppSlice();
  const [minimumDeposit, setMinimumDeposit] = useState<string>();

  const anchorProgram = useAnchorLsdProgram();

  useEffect(() => {
    (async () => {
      try {
        if (!anchorProgram) {
          return;
        }

        const stakeManagerAccount =
          await anchorProgram.account.stakeManager.fetch(
            solanaPrograms.stakeManagerAccountAddress
          );

        // console.log({ stakeManagerAccount });

        setMinimumDeposit(
          chainAmountToHuman(stakeManagerAccount.minStakeAmount.toString())
        );
      } catch (err: any) {}
    })();
  }, [updateFlag, anchorProgram]);

  return {
    minimumDeposit,
  };
}
