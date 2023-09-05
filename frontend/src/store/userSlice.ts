import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  email: string | null;
  accessToken: string | null;
  username: string | null;
  userId: number | null;
  isLogged: boolean;
}

const initialState = { isLogged: false } as userState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        email: string;
        accessToken: string;
        username: string;
        userId: number;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.isLogged = true;
    },
    logoutUser(state) {
      state.isLogged = false;
      state.accessToken = null;
      state.email = null;
      state.username = null;
      state.userId = null;
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
