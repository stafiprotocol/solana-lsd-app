import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import appReducer from "./reducers/AppSlice";
import walletReducer from "./reducers/WalletSlice";
import tokenReducer from "./reducers/TokenSlice";
import lstReducer from "./reducers/LstSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    wallet: walletReducer,
    token: tokenReducer,
    lst: lstReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
