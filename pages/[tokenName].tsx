import { useWallet } from "@solana/wallet-adapter-react";
import classNames from "classnames";
import { CustomTag } from "components/common/CustomTag";
import { FaqItem } from "components/common/FaqItem";
import { PageTitleContainer } from "components/common/PageTitleContainer";
import { Icomoon } from "components/icon/Icomoon";
import { DashboardTabs } from "components/staking/DashboardTabs";
import { StakePage } from "components/staking/StakePage";
import { WithdrawUnstaked } from "components/staking/WithdrawUnstaked";
import { solanaPrograms } from "config";
import { getSolanaScanAccountUrl } from "config/explorer";
import { useBalance } from "hooks/useBalance";
import { useLsdApr } from "hooks/useLsdApr";
import { useLsdRate } from "hooks/useLsdRate";
import { useUnclaimedWithdrawals } from "hooks/useUnclaimedWithdrawals";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { openLink } from "utils/commonUtils";
import {
  IFaqContent,
  IFaqItem,
  getFaqList,
  getLsdTokenName,
  getSupportChains,
  getTokenName,
} from "utils/configUtils";
import { getLsdTokenIcon } from "utils/iconUtils";
import { formatNumber, getRefinedStakedAmount } from "utils/numberUtils";

export async function getStaticPaths() {
  return {
    paths: [{ params: { tokenName: getTokenName() } }],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  return { props: {} };
};

const SolPage = () => {
  const router = useRouter();
  const apr = useLsdApr();

  const withdrawInfo = useUnclaimedWithdrawals();

  const { publicKey } = useWallet();

  const { lsdBalance } = useBalance();
  const rate = useLsdRate();

  const stakedEth = useMemo(() => {
    if (isNaN(Number(lsdBalance)) || isNaN(Number(rate))) {
      return "--";
    }
    return getRefinedStakedAmount(lsdBalance, rate);
  }, [lsdBalance, rate]);

  const selectedTab = useMemo(() => {
    const tabParam = router.query.tab;
    if (tabParam) {
      switch (tabParam) {
        case "stake":
        case "unstake":
        case "withdraw":
          return tabParam;
        default:
          return "stake";
      }
    }
    return "stake";
  }, [router.query]);

  const showWithdrawTab = useMemo(() => {
    const overallAmount = withdrawInfo?.overallAmount;
    return (
      !!overallAmount &&
      !isNaN(Number(overallAmount)) &&
      Number(overallAmount) > 0
    );
  }, [withdrawInfo]);

  const updateTab = (tab: string) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        tab,
      },
    });
  };

  const renderFaqContent = (content: IFaqContent, index: number) => {
    if (content.type === "link") {
      if (content.content.endsWith("\n")) {
        return (
          <div className={classNames(index > 0 ? "mt-faqGap" : "")} key={index}>
            <a
              className="text-color-link cursor-pointer"
              href={content.link}
              target="_blank"
              rel="noreferrer"
            >
              {content.content.trimEnd()}
            </a>
          </div>
        );
      } else {
        return (
          <a
            className="text-color-link cursor-pointer"
            href={content.link}
            target="_blank"
            rel="noreferrer"
            key={index}
          >
            {content.content}
          </a>
        );
      }
    } else {
      if (content.content.endsWith("\n")) {
        return (
          <div className={classNames(index > 0 ? "mt-faqGap" : "")} key={index}>
            {content.content}
          </div>
        );
      } else {
        return <span key={index}>{content.content}</span>;
      }
    }
  };

  const renderFaqContents = (contents: IFaqContent[]) => {
    const renderedJSX: React.ReactElement[] = [];
    contents.forEach((content: IFaqContent, index: number) => {
      const contentJSX = renderFaqContent(content, index);
      renderedJSX.push(contentJSX);
    });
    return renderedJSX;
  };

  return (
    <div>
      <PageTitleContainer>
        <div className="h-full flex items-center w-smallContentW xl:w-contentW 2xl:w-largeContentW">
          <div className="w-[.68rem] h-[.68rem] relative">
            <Image src={getLsdTokenIcon()} layout="fill" alt="icon" />
          </div>
          <div className="ml-[.12rem]">
            <div className="flex items-center">
              <div className="text-[.34rem] font-[700] text-color-text1">
                {getLsdTokenName()}
              </div>

              <div className="ml-[.16rem]">
                <CustomTag type="stroke">
                  <div className="text-[.16rem] scale-75 origin-center">
                    SPL20
                  </div>
                </CustomTag>
              </div>

              <div className="ml-[.06rem]">
                <CustomTag>
                  <div className="text-[.16rem] scale-75 origin-center flex items-center">
                    <span className="font-[700]">
                      {formatNumber(apr, { decimals: 2 })}%
                    </span>
                    <span className="ml-[.02rem]">APR</span>
                  </div>
                </CustomTag>
              </div>
            </div>

            <div className="mt-[.04rem] text-color-text2 text-[.16rem] scale-75 origin-bottom-left">
              On {getSupportChains().join(", ")}{" "}
              {getSupportChains().length > 1 ? "Chains" : "Chain"}
            </div>
          </div>

          {publicKey && (
            <div className="ml-auto mr-[.56rem] flex flex-col justify-center items-end">
              <div className="text-[.34rem] font-[700] text-color-text1">
                {formatNumber(lsdBalance)}
              </div>
              <div className="text-[.12rem] text-color-text2 mt-[.04rem]">
                {formatNumber(stakedEth)} {getTokenName()} Staked
              </div>
            </div>
          )}
        </div>
      </PageTitleContainer>

      <div className="w-smallContentW xl:w-contentW 2xl:w-largeContentW mx-auto">
        <div className="my-[.36rem] mr-[.56rem]">
          {showWithdrawTab && (
            <DashboardTabs
              selectedTab={selectedTab}
              onChangeTab={updateTab}
              showWithdrawTab={showWithdrawTab}
            />
          )}

          <div className="mt-[.36rem] flex ">
            <div className={classNames("flex-1 min-w-[6.2rem] w-[6.2rem]")}>
              {(selectedTab === "stake" || selectedTab === "unstake") && (
                <StakePage />
              )}

              {selectedTab === "withdraw" && (
                <WithdrawUnstaked
                  overallAmount={withdrawInfo?.overallAmount}
                  claimableAmount={withdrawInfo?.claimableAmount}
                  remainingTimeInSeconds={withdrawInfo?.remainingTimeInSeconds}
                />
              )}
            </div>

            <div className="ml-[.87rem] flex-1">
              <div className="text-[.24rem] text-color-text1">Detail Info</div>

              <div className="mt-[.16rem] bg-color-bg3 rounded-[.12rem] py-[.16rem] px-[.24rem] text-[.14rem]">
                <div className="text-color-text1 font-[700]">
                  Stake Manager Address
                </div>

                <div
                  className="cursor-pointer mt-[.12rem] text-color-link flex items-center"
                  onClick={() => {
                    openLink(
                      getSolanaScanAccountUrl(
                        solanaPrograms.stakeManagerProgramId
                      )
                    );
                  }}
                >
                  <span className="mr-[.12rem] flex-1 break-all leading-normal dark:text-linkDark/50">
                    {solanaPrograms.stakeManagerProgramId}
                  </span>

                  <div className="min-w-[.12rem]">
                    <Icomoon icon="share" size=".12rem" />
                  </div>
                </div>

                <div className="mt-[.16rem] text-color-text1 font-[700]">
                  Lsd Token Address
                </div>

                <div
                  className="cursor-pointer mt-[.12rem] text-color-link flex items-center"
                  onClick={() => {
                    openLink(
                      getSolanaScanAccountUrl(solanaPrograms.lsdTokenMint)
                    );
                  }}
                >
                  <span className="mr-[.12rem] flex-1 break-all leading-normal dark:text-linkDark/50">
                    {solanaPrograms.lsdTokenMint}
                  </span>

                  <div className="min-w-[.12rem]">
                    <Icomoon icon="share" size=".12rem" />
                  </div>
                </div>

                <div className="mt-[.16rem] text-color-text1 font-[700] hidden">
                  {getLsdTokenName()} Onchain Exchange Rate Source
                </div>

                <div className="mt-[.12rem] text-color-link hidden items-center">
                  <span className="mr-[.12rem] flex-1 break-all leading-normal dark:text-linkDark/50">
                    SDK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {getFaqList().length > 0 && (
          <div className={classNames("mr-[.56rem] pb-[.56rem]")}>
            <div className="mt-[.16rem] text-[.24rem] text-color-text1">
              FAQ
            </div>

            <div
              className="grid items-start mt-[.16rem]"
              style={{
                gridTemplateColumns: "48% 48%",
                columnGap: "4%",
                rowGap: ".16rem",
              }}
            >
              {getFaqList().map((item: IFaqItem, index: number) => (
                <FaqItem text={item.title} key={index}>
                  {renderFaqContents(item.contents)}
                </FaqItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolPage;
