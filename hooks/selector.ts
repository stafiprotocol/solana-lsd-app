import { useAppSelector } from "./common";

export function useAppSlice() {
  const { darkMode, updateFlag, unreadNoticeFlag } = useAppSelector(
    (state) => state.app
  );

  return { darkMode, updateFlag, unreadNoticeFlag };
}
