import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  email: string | null;
  accessToken: string | null;
  username:string | null , 
  isLogged: boolean;
}

const initialState = { isLogged: false } as userState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{ email: string; accessToken: string , username:string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.username = action.payload.username
      state.isLogged = true;
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
