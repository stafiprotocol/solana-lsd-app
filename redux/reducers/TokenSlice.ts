import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CANCELLED_MESSAGE,
  CONNECTION_ERROR_MESSAGE,
  LOADING_MESSAGE_UNSTAKING,
  LOADING_MESSAGE_WITHDRAWING,
  TRANSACTION_FAILED_MESSAGE,
} from "constants/common";
import { AppThunk } from "redux/store";
import { isSolanaCancelError, sleep, uuid } from "utils/commonUtils";
import snackbarUtil from "utils/snackbarUtils";
import { getEthWeb3 } from "utils/web3Utils";
import Web3 from "web3";
import {
  addNotice,
  setStakeLoading,
  setStakeLoadingParams,
  setUnstakeLoading,
  setUnstakeLoadingParams,
  setWithdrawLoading,
  setWithdrawLoadingParams,
  updateStakeLoadingParams,
  updateUnstakeLoadingParams,
  updateWithdrawLoadingParams,
} from "./AppSlice";
import * as crypto from "crypto";
import { LsdProgram } from "config/idl/lsd_program";
import { BN, Program } from "@coral-xyz/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  TransactionResponse,
} from "@solana/web3.js";
import { solanaPrograms } from "config";
import { getSplTokenAccount, sendSolanaTransaction } from "utils/solanaUtils";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { getSolanaScanTxUrl } from "config/explorer";
import { LocalNotice } from "utils/noticeUtils";
import { getLsdTokenName, getTokenName } from "utils/configUtils";
import { formatNumber } from "utils/numberUtils";

export interface EthState {
  txLoading: boolean;
  balance: string | undefined;
  currentNodeDepositAmount: string | undefined;
  latestBlockTimestamp: string;
  ethClaimRewardsLoading: boolean;
}

const initialState: EthState = {
  txLoading: false,
  balance: undefined,
  currentNodeDepositAmount: undefined,
  latestBlockTimestamp: "0",
  ethClaimRewardsLoading: false,
};

export const ethSlice = createSlice({
  name: "eth",
  initialState,
  reducers: {
    setEthTxLoading: (state: EthState, action: PayloadAction<boolean>) => {
      state.txLoading = action.payload;
    },
    setEthBalance: (
      state: EthState,
      action: PayloadAction<string | undefined>
    ) => {
      state.balance = action.payload;
    },
    setCurrentNodeDepositAmount: (
      state: EthState,
      action: PayloadAction<string>
    ) => {
      state.currentNodeDepositAmount = action.payload;
    },
    setLatestBlockTimestamp: (
      state: EthState,
      action: PayloadAction<string>
    ) => {
      state.latestBlockTimestamp = action.payload;
    },
    setEthClaimRewardsLoading: (
      state: EthState,
      action: PayloadAction<boolean>
    ) => {
      state.ethClaimRewardsLoading = action.payload;
    },
  },
});

export const {
  setEthTxLoading,
  setEthBalance,
  setCurrentNodeDepositAmount,
  setLatestBlockTimestamp,
  setEthClaimRewardsLoading,
} = ethSlice.actions;

export default ethSlice.reducer;

/**
 * stake SOL
 */
export const handleTokenStake =
  (
    connection: Connection,
    sendTransaction: WalletAdapterProps["sendTransaction"],
    anchorProgram: Program<LsdProgram>,
    userAddress: string,
    stakeAmount: string,
    willReceiveAmount: string,
    newLsdTokenBalance: string,
    onSuccess: () => void
  ): AppThunk =>
  async (dispatch, getState) => {
    const noticeUuid = uuid();
    try {
      dispatch(setStakeLoading(true));
      dispatch(
        setStakeLoadingParams({
          modalVisible: true,
          noticeUuid,
          status: "loading",
          amount: Number(stakeAmount) + "",
          willReceiveAmount,
          newLsdTokenBalance,
        })
      );

      const lsdProgramPubkey = new PublicKey(solanaPrograms.lsdProgramId);
      const stakeManagerPubkey = new PublicKey(
        solanaPrograms.stakeManagerProgramId
      );
      const userPubkey = new PublicKey(userAddress);
      const lsdTokenMintPubkey = new PublicKey(solanaPrograms.lsdTokenMint);

      const [stakePoolPubkey, number] = PublicKey.findProgramAddressSync(
        [stakeManagerPubkey.toBuffer(), Buffer.from("pool_seed")],
        lsdProgramPubkey
      );

      const transaction = new Transaction();

      let ata = await getAssociatedTokenAddress(lsdTokenMintPubkey, userPubkey);

      const userSplTokenAddress = await getSplTokenAccount(
        connection,
        userAddress,
        solanaPrograms.lsdTokenMint
      );
      console.log("111", userSplTokenAddress?.pubkey.toString());

      if (!userSplTokenAddress) {
        console.log(`create ata: ${ata.toString()}`);

        const ataInstruction = createAssociatedTokenAccountInstruction(
          userPubkey,
          ata,
          userPubkey,
          lsdTokenMintPubkey
        );
        transaction.add(ataInstruction);
      }

      const anchorInstruction = await anchorProgram.methods
        .stake(new BN((Number(stakeAmount) * 1000000000).toFixed(0)))
        .accounts({
          stakeManager: stakeManagerPubkey,
          stakePool: stakePoolPubkey,
          from: userPubkey,
          lsdTokenMint: lsdTokenMintPubkey,
          mintTo: ata,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .instruction();
      transaction.add(anchorInstruction);

      // const txid = await sendTransaction(transaction, connection);
      const txid = await sendSolanaTransaction(transaction, connection);
      console.log(
        `View on explorer: https://explorer.solana.com/tx/${txid}?cluster=custom`
      );

      let retryCount = 0;
      let transactionDetail: TransactionResponse | null | undefined = undefined;
      while (retryCount < 20 && txid) {
        retryCount++;
        transactionDetail = await connection.getTransaction(txid, {
          commitment: "finalized",
        });
        console.log({ transactionDetail });
        if (transactionDetail) {
          break;
        }
        await sleep(3000);
      }

      if (transactionDetail) {
        onSuccess();
        const txHash = txid || "";
        dispatch(
          updateStakeLoadingParams(
            {
              status: "success",
              txHash: txHash,
              scanUrl: getSolanaScanTxUrl(txHash),
            },
            (newParams) => {
              const newNotice: LocalNotice = {
                id: noticeUuid || uuid(),
                type: "Stake",
                txDetail: { transactionHash: txHash, sender: userAddress },
                data: {
                  amount: Number(stakeAmount) + "",
                  willReceiveAmount: Number(willReceiveAmount) + "",
                },
                scanUrl: getSolanaScanTxUrl(txHash),
                status: "Confirmed",
                stakeLoadingParams: newParams,
              };
              dispatch(addNotice(newNotice));
            }
          )
        );
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: any) {
      let displayMsg = TRANSACTION_FAILED_MESSAGE;
      if (isSolanaCancelError(err)) {
        snackbarUtil.error(CANCELLED_MESSAGE);
        dispatch(setStakeLoadingParams(undefined));
        return;
      }
      dispatch(
        updateStakeLoadingParams(
          {
            status: "error",
            displayMsg: displayMsg,
          },
          (newParams) => {
            dispatch(
              addNotice({
                id: noticeUuid || uuid(),
                type: "Stake",
                data: {
                  amount: Number(stakeAmount) + "",
                  willReceiveAmount: Number(willReceiveAmount) + "",
                },
                status: "Error",
                stakeLoadingParams: newParams,
              })
            );
          }
        )
      );
    } finally {
      dispatch(setStakeLoading(false));
    }
  };

export const updateEthLatestBlockTimestamp =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const web3 = getEthWeb3();
      const blockNumber = await web3.givenProvider.request({
        method: "eth_blockNumber",
      });
      const block = await web3.givenProvider.request({
        method: "eth_getBlockByNumber",
        params: [blockNumber, true],
      });
      const latestBlockTimestamp = parseInt(block.timestamp, 16);
      dispatch(setLatestBlockTimestamp(latestBlockTimestamp + ""));
    } catch (err: unknown) {}
  };

/**
 * unstake lsd SOL
 */
export const handlelsdTokenUnstake =
  (
    connection: Connection,
    sendTransaction: WalletAdapterProps["sendTransaction"],
    anchorProgram: Program<LsdProgram>,
    userAddress: string,
    unstakeAmount: string,
    willReceiveAmount: string,
    newLsdTokenBalance: string,
    isReTry: boolean,
    onSuccess: () => void
  ): AppThunk =>
  async (dispatch, getState) => {
    const noticeUuid = isReTry
      ? getState().app.unstakeLoadingParams?.noticeUuid
      : uuid();
    const unstakeAmountInWei = Web3.utils.toWei(unstakeAmount);

    try {
      dispatch(setUnstakeLoading(true));
      if (!userAddress) {
        throw new Error("Please connect MetaMask");
      }

      dispatch(
        setUnstakeLoadingParams({
          modalVisible: true,
          status: "loading",
          targetAddress: userAddress,
          amount: unstakeAmount,
          willReceiveAmount,
          newLsdTokenBalance,
          customMsg: LOADING_MESSAGE_UNSTAKING,
        })
      );

      // const nextWithdrawIndex = await contract.methods
      //   .nextWithdrawIndex()
      //   .call();
      // console.log("nextWithdrawIndex", nextWithdrawIndex);

      dispatch(
        updateUnstakeLoadingParams({
          customMsg: `Please confirm the ${Number(
            unstakeAmount
          )} ${getLsdTokenName()} unstaking transaction in your wallet`,
        })
      );

      const lsdProgramPubkey = new PublicKey(solanaPrograms.lsdProgramId);
      const stakeManagerPubkey = new PublicKey(
        solanaPrograms.stakeManagerProgramId
      );
      const userPubkey = new PublicKey(userAddress);
      const lsdTokenMintPubkey = new PublicKey(solanaPrograms.lsdTokenMint);

      const splTokenAccount = await getSplTokenAccount(
        connection,
        userAddress,
        solanaPrograms.lsdTokenMint
      );

      if (!splTokenAccount) {
        throw new Error("SPL Token Account not found");
      }

      const transaction = new Transaction();

      const unstakeAccountKeypair = Keypair.generate();
      const unstakeAccountRent =
        await connection.getMinimumBalanceForRentExemption(100);
      const createAccountInstruction = SystemProgram.createAccount({
        fromPubkey: userPubkey,
        newAccountPubkey: unstakeAccountKeypair.publicKey,
        lamports: unstakeAccountRent,
        space: 100,
        programId: stakeManagerPubkey,
      });
      // transaction.add(createAccountInstruction);

      const tokenAccountAuthorityAddress =
        splTokenAccount.account.data.parsed?.info?.delegate ||
        splTokenAccount.account.data.parsed?.info?.owner;

      console.log({ tokenAccountAuthorityAddress });

      // const anchorInstruction = await anchorProgram.methods
      //   .unstake(new BN((Number(unstakeAmount) * 1000000000).toFixed(0)))
      //   .accounts({
      //     stakeManager: stakeManagerPubkey,
      //     lsdTokenMint: lsdTokenMintPubkey,
      //     burnLsdTokenFrom: splTokenAccount.pubkey,
      //     burnLsdTokenAuthority: new PublicKey(tokenAccountAuthorityAddress),
      //     unstakeAccount: unstakeAccountKeypair.publicKey,
      //     rentPayer: userPubkey,
      //     systemProgram: SystemProgram.programId,
      //     tokenProgram: TOKEN_PROGRAM_ID,
      //     clock: SYSVAR_CLOCK_PUBKEY,
      //     rent: SYSVAR_RENT_PUBKEY,
      //   })
      //   .instruction();
      const bf = crypto.createHash("sha256").update("global:unstake").digest();
      const methodData = bf.slice(0, 8);
      // amount, LittleEndian
      const num = BigInt(Number(unstakeAmount) * 1000000000);
      const ab = new ArrayBuffer(8);
      new DataView(ab).setBigInt64(0, num, true);
      // const amountBf = hexToU8a('0x' + num.toString(16));
      const amountData = Buffer.from(ab);

      const data = Buffer.concat([methodData, amountData]);
      const anchorInstruction = new TransactionInstruction({
        keys: [
          {
            pubkey: stakeManagerPubkey,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: lsdTokenMintPubkey,
            isSigner: false,
            isWritable: true,
          },
          // burnRsolFrom
          { pubkey: splTokenAccount.pubkey, isSigner: false, isWritable: true },
          // burnRsolAuthority
          {
            pubkey: new PublicKey(tokenAccountAuthorityAddress),
            isSigner: true,
            isWritable: false,
          },
          // unstakeAccount
          {
            pubkey: unstakeAccountKeypair.publicKey,
            isSigner: true,
            isWritable: true,
          },
          // rentPayer
          {
            pubkey: userPubkey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: lsdProgramPubkey,
        data: data,
      });

      transaction.add(anchorInstruction);

      // const txid = await sendTransaction(transaction, connection);
      const txid = await sendSolanaTransaction(transaction, connection, [
        unstakeAccountKeypair,
      ]);
      console.log({ txid });
      let retryCount = 0;
      let transactionDetail: TransactionResponse | null | undefined = undefined;
      while (retryCount < 20 && txid) {
        retryCount++;
        transactionDetail = await connection.getTransaction(txid, {
          commitment: "finalized",
        });
        console.log({ transactionDetail });
        if (transactionDetail) {
          break;
        }
        await sleep(3000);
      }

      if (transactionDetail) {
        // const unclaimedWithdrawsOfUser = await contract.methods
        //   .getUnclaimedWithdrawalsOfUser(metaMaskAccount)
        //   .call();
        // console.log("unclaimedWithdrawsOfUser", unclaimedWithdrawsOfUser);

        // const needWithdraw =
        //   unclaimedWithdrawsOfUser.indexOf(nextWithdrawIndex) >= 0;
        // const customMsg = !needWithdraw
        //   ? `Unstaking ${Number(
        //       unstakeAmount
        //     )} ${getTokenName()} operation was successful.`
        //   : `Unstaking operation was successful. Withdraw function will be shown in the page later, please wait for the withdraw opening to get your unstaked ${getTokenName()}.`;
        onSuccess();
        const customMsg = `Unstaking operation was successful. Withdraw function will be shown in the page later, please wait for the withdraw opening to get your unstaked ${getTokenName()}.`;

        const txHash = txid || "";
        dispatch(
          updateUnstakeLoadingParams({
            status: "success",
            txHash: txHash,
            scanUrl: getSolanaScanTxUrl(txHash),
            customMsg,
          })
        );
        const newNotice: LocalNotice = {
          id: noticeUuid || uuid(),
          type: "Unstake",
          txDetail: { transactionHash: txHash, sender: userAddress },
          data: {
            amount: Number(unstakeAmount) + "",
            willReceiveAmount: Number(willReceiveAmount) + "",
            needWithdraw: true,
          },
          scanUrl: getSolanaScanTxUrl(txHash),
          status: "Confirmed",
        };
        dispatch(addNotice(newNotice));
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: any) {
      {
        console.log({ err });
        // snackbarUtil.error(err.message);
        let displayMsg = err.message || TRANSACTION_FAILED_MESSAGE;
        if (isSolanaCancelError(err)) {
          snackbarUtil.error(CANCELLED_MESSAGE);
          dispatch(setUnstakeLoadingParams(undefined));
          return;
        }
        dispatch(
          updateUnstakeLoadingParams({
            status: "error",
            customMsg: displayMsg || "Unstake failed",
          })
        );
      }
    } finally {
      dispatch(setUnstakeLoading(false));
    }
  };

/**
 * withdraw unstaked LST
 */
export const handleTokenWithdraw =
  (
    connection: Connection,
    sendTransaction: WalletAdapterProps["sendTransaction"],
    anchorProgram: Program<LsdProgram>,
    userAddress: string,
    withdrawAmount: string,
    isReTry: boolean,
    onSuccess: () => void
  ): AppThunk =>
  async (dispatch, getState) => {
    const noticeUuid = isReTry
      ? getState().app.stakeLoadingParams?.noticeUuid
      : uuid();

    try {
      dispatch(setWithdrawLoading(true));
      dispatch(
        setWithdrawLoadingParams({
          modalVisible: true,
          status: "loading",
          tokenAmount: withdrawAmount,
          customMsg: LOADING_MESSAGE_WITHDRAWING,
        })
      );

      dispatch(
        updateWithdrawLoadingParams({
          customMsg: `Please confirm the ${formatNumber(
            Number(withdrawAmount)
          )} ${getTokenName()} withdraw transaction in your wallet`,
        })
      );

      const stakeManagerAccount =
        await anchorProgram.account.stakeManager.fetch(
          new PublicKey(solanaPrograms.stakeManagerProgramId)
        );

      const unbondingDuration = Number(
        stakeManagerAccount.unbondingDuration.toString()
      );

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
                bytes: userAddress,
              },
            },
          ],
        }
      );

      const epochInfo = await connection.getEpochInfo();
      const transaction = new Transaction();
      const stakeManagerPubkey = new PublicKey(
        solanaPrograms.stakeManagerProgramId
      );
      const lsdProgramPubkey = new PublicKey(solanaPrograms.lsdProgramId);
      const [stakePoolPubkey, number] = PublicKey.findProgramAddressSync(
        [stakeManagerPubkey.toBuffer(), Buffer.from("pool_seed")],
        lsdProgramPubkey
      );

      const accountRequests = accounts.map((account) => {
        return (async () => {
          const unstakeAccount =
            await anchorProgram.account.unstakeAccount.fetch(account.pubkey);

          if (
            Number(epochInfo.epoch) >=
            Number((unstakeAccount as any).createdEpoch) + unbondingDuration
          ) {
            // 2. Add Tx Instruction
            const bf = crypto
              .createHash("sha256")
              .update("global:withdraw")
              .digest();
            const methodData = bf.slice(0, 8);
            const data = Buffer.concat([methodData]);
            // console.log('sdfsdfsdf', u8aToHex(data));

            const instruction = new TransactionInstruction({
              keys: [
                {
                  pubkey: stakeManagerPubkey,
                  isSigner: false,
                  isWritable: true,
                },
                {
                  pubkey: stakePoolPubkey,
                  isSigner: false,
                  isWritable: true,
                },
                // unstakeAccount
                { pubkey: account.pubkey, isSigner: false, isWritable: true },
                // recipient
                {
                  pubkey: new PublicKey(userAddress),
                  isSigner: false,
                  isWritable: true,
                },
                // SysVarClockPubkey
                {
                  pubkey: SYSVAR_CLOCK_PUBKEY,
                  isSigner: false,
                  isWritable: false,
                },
                {
                  pubkey: SystemProgram.programId,
                  isSigner: false,
                  isWritable: false,
                },
              ],
              programId: lsdProgramPubkey,
              data: data,
            });
            transaction.add(instruction);
          }
        })();
      });

      await Promise.all(accountRequests);

      const txid = await sendSolanaTransaction(transaction, connection);
      console.log({ txid });
      let retryCount = 0;
      let transactionDetail: TransactionResponse | null | undefined = undefined;
      while (retryCount < 20 && txid) {
        retryCount++;
        transactionDetail = await connection.getTransaction(txid, {
          commitment: "finalized",
        });
        console.log({ transactionDetail });
        if (transactionDetail) {
          break;
        }
        await sleep(3000);
      }

      if (transactionDetail && !transactionDetail.meta?.err) {
        onSuccess();
        const txHash = txid || "";
        dispatch(
          updateWithdrawLoadingParams(
            {
              status: "success",
              broadcastStatus: "success",
              packStatus: "success",
              finalizeStatus: "success",
              txHash: txHash,
              scanUrl: getSolanaScanTxUrl(txHash),
              customMsg: undefined,
            },
            (newParams) => {
              dispatch(
                addNotice({
                  id: noticeUuid || "",
                  type: "Withdraw",
                  data: {
                    tokenAmount: withdrawAmount,
                  },
                  status: "Confirmed",
                  scanUrl: getSolanaScanTxUrl(txHash),
                })
              );
            }
          )
        );
      } else {
        throw new Error(TRANSACTION_FAILED_MESSAGE);
      }
    } catch (err: any) {
      let displayMsg = err.message || TRANSACTION_FAILED_MESSAGE;
      if (isSolanaCancelError(err)) {
        snackbarUtil.error(CANCELLED_MESSAGE);
        dispatch(setWithdrawLoadingParams(undefined));
        return;
      }
      dispatch(
        updateWithdrawLoadingParams({
          status: "error",
          customMsg: displayMsg || "Unstake failed",
        })
      );
    } finally {
      dispatch(setWithdrawLoading(false));
    }
  };
