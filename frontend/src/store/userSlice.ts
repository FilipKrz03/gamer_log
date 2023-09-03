import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  email: string | null;
  accessToken: string | null;
  isLogged: boolean;
}

const initialState = { isLogged: false } as userState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ email: string; accessToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.isLogged = true;
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
