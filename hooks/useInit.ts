import dayjs from "dayjs";
import { useEffect } from "react";
import {
  setDarkMode,
  setUnreadNoticeFlag,
  setUpdateFlag,
} from "redux/reducers/AppSlice";
import { updateApr } from "redux/reducers/LstSlice";
import {
  getStorage,
  STORAGE_KEY_DARK_MODE,
  STORAGE_KEY_UNREAD_NOTICE,
} from "utils/storageUtils";
import { useAppDispatch } from "./common";
import { useAppSlice } from "./selector";
import { useInterval } from "./useInterval";
import { useWallet } from "@solana/wallet-adapter-react";
import { setUserAddress } from "redux/reducers/WalletSlice";

export function useInit() {
  const dispatch = useAppDispatch();
  const { updateFlag, darkMode } = useAppSlice();

  const { publicKey } = useWallet();
  const userAddress = publicKey?.toString();

  useEffect(() => {
    dispatch(setUserAddress(userAddress));
  }, [userAddress, dispatch]);

  useEffect(() => {
    // Init local data.
    const unreadNotice = getStorage(STORAGE_KEY_UNREAD_NOTICE);
    dispatch(setUnreadNoticeFlag(!!unreadNotice));
    dispatch(setDarkMode(!!getStorage(STORAGE_KEY_DARK_MODE)));
  }, [dispatch]);

  useEffect(() => {
    if (dispatch && updateFlag) {
      // query apr
      dispatch(updateApr());
    }
  }, [updateFlag, dispatch]);

  useInterval(() => {
    dispatch(setUpdateFlag(dayjs().unix()));
  }, 6000); // 6s

  // Change body backgroundColor
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#222C3C" : "#E8EFFD";
  }, [darkMode]);
}
