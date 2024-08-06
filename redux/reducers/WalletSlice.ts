import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface WalletState {
  useAddress: string | undefined;
}

const initialState: WalletState = {
  useAddress: undefined,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setUserAddress: (
      state: WalletState,
      action: PayloadAction<string | undefined>
    ) => {
      state.useAddress = action.payload;
    },
  },
});

export const { setUserAddress } = walletSlice.actions;

export default walletSlice.reducer;
