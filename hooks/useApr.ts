import { RootState } from "redux/store";
import { useAppSelector } from "./common";

export function useApr() {
  const { apr } = useAppSelector((state: RootState) => {
    return {
      apr: state.lst.apr,
    };
  });

  return { apr };
}
