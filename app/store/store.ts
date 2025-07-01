import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/userSlices";
import restAreaReducer from "./slices/restAreaSlice"

export const store = configureStore({
  reducer: {
    user: authReducer, //auth 상태로 등록
    restArea: restAreaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch