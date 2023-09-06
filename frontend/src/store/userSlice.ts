import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  email: string | undefined;
  accessToken: string | undefined;
  username: string | undefined;
  userId: number | undefined;
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
      state.accessToken = undefined;
      state.email = undefined;
      state.username = undefined;
      state.userId = undefined;
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
