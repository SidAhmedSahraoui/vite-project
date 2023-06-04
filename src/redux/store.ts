import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import ui from "./ui/ui-slice";
import auth from "./auth/auth-slice";
import error from "./error/error-slice";
import categories from "./categories/categories-slice";
export const store = configureStore({
  reducer: {
    ui,
    auth,
    categories,
    error,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
