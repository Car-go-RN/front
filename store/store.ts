import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/userSlices";
import categoryReducer from "./slices/CategorySlices";
// import favoriteReducer from "./slices/favoriteSlice"
import restAreaReducer from "./slices/restAreaSlice"

export const store = configureStore({
  reducer: {
    user: authReducer, //auth 상태로 등록
    category: categoryReducer,
    // favorite: favoriteReducer,
    restArea: restAreaReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch