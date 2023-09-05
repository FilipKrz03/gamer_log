import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import statusSlice from "./statusSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    status: statusSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
