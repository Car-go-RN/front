import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string,
  userId: number | null,
}

interface AuthState {
  token: string | null
  user: User | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  token: null,
  user: {
    email: '',
    userId: null
  },
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{token: string; user: User}>) {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLoggedIn = true
    },
    logout(state) {
      state.token = null
      state.user = null
      state.isLoggedIn = false
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer