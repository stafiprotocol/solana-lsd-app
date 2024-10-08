import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "hooks/common";
import { useAnchorLsdProgram } from "hooks/useAnchorLsdProgram";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { setUpdateFlag } from "redux/reducers/AppSlice";
import { handleTokenWithdraw } from "redux/reducers/TokenSlice";
import { RootState } from "redux/store";
import { getTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";
import { CustomButton } from "../common/CustomButton";
import { formatWithdrawRemaingTime } from "utils/timeUtils";

interface Props {
  overallAmount: string | undefined;
  claimableAmount: string | undefined;
  remainingTimeInSeconds: number | undefined;
}

export const WithdrawUnstaked = (props: Props) => {
  const { overallAmount, claimableAmount, remainingTimeInSeconds } = props;

  const router = useRouter();
  const { publicKey, sendTransaction } = useWallet();
  const walletModal = useWalletModal();
  const { connection } = useConnection();
  const anchorProgram = useAnchorLsdProgram();

  const dispatch = useAppDispatch();
  const { withdrawLoading } = useAppSelector((state: RootState) => {
    return { withdrawLoading: state.app.withdrawLoading };
  });

  const withdrawDisabled = useMemo(() => {
    return (
      !claimableAmount ||
      isNaN(Number(claimableAmount)) ||
      Number(claimableAmount) === 0 ||
      withdrawLoading
    );
  }, [claimableAmount, withdrawLoading]);

  const remainingDays = formatWithdrawRemaingTime(
    (remainingTimeInSeconds || 0) * 1000
  );

  const clickWithdraw = () => {
    if (withdrawDisabled || !publicKey || !anchorProgram || !claimableAmount) {
      return;
    }

    dispatch(
      handleTokenWithdraw(
        connection,
        sendTransaction,
        anchorProgram,
        publicKey.toString(),
        claimableAmount,
        false,
        () => {
          dispatch(setUpdateFlag(dayjs().unix()));
          router.replace({
            pathname: router.pathname,
            query: {
              ...router.query,
              tab: "stake",
            },
          });
        }
      )
    );
  };

  return (
    <div className="mt-[.18rem] bg-color-bg2 rounded-[.3rem] py-[.18rem]">
      <div className="mt-[.2rem] mx-[.24rem] flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-[.14rem] text-color-text2 opacity-50 font-[500]">
            Overall Amount
          </div>

          <div className="ml-[.12rem] text-[.16rem] text-color-text2 font-[500]">
            {formatNumber(overallAmount)} {getTokenName()}
          </div>
        </div>

        <div className="flex items-center ">
          <div className="text-[.14rem] text-color-text2 font-[500] opacity-50">
            Remaining Lock Time
          </div>
          <div className="text-[.16rem] text-color-text2 font-[500] ml-[.12rem]">
            {remainingDays}
          </div>
        </div>
      </div>

      <div className="h-[.77rem] mt-[.25rem] mx-[.24rem] px-[.24rem] bg-color-bgPage rounded-[.3rem] flex items-center justify-between">
        <div className="text-[.14rem] text-color-text1 font-[500]">
          Withdrawable
        </div>
        <div className="text-[.24rem] text-color-text1 font-[500]">
          {formatNumber(claimableAmount)} {getTokenName()}
        </div>
        <div className="text-[.14rem] text-color-text2 invisible">
          Withdrawable
        </div>
      </div>

      <div className="mt-[.2rem] mx-[.24rem]">
        <CustomButton
          height=".56rem"
          disabled={withdrawDisabled}
          onClick={clickWithdraw}
        >
          Withdraw
        </CustomButton>
      </div>
    </div>
  );
};
