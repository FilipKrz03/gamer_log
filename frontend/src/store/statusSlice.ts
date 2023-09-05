import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "react";

interface ISetSuccesAction {
  payload: string | undefined;
  type: "status/setSucces" | "status/removeSucces";
}

interface ISetErrorAction {
  payload: string | undefined;
  type: "status/setError" | "status/removeError";
}

interface statusState {
  isError: boolean;
  isSucces: boolean;
  succesMessage: string;
  errorMessage: string;
}

const initialState = {
  isError: false,
  isSucces: false,
  succesMessage: "",
  errorMessage: "",
} as statusState;

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setSucces(state, action: PayloadAction<string>) {
      state.isSucces = true;
      state.succesMessage = action.payload;
    },
    removeSucces(state) {
      state.isSucces = false;
      state.succesMessage = "";
    },
    setError(state, action: PayloadAction<string>) {
      state.isError = true;
      state.errorMessage = action.payload;
    },
    removeError(state) {
      state.isError = false;
      state.errorMessage = "";
    },
  },
});
export const statusActions = statusSlice.actions;

export const setSuccesMessage = (succesMessage: string) => {
  return (dispatch: Dispatch<ISetSuccesAction>) => {
    dispatch(statusActions.setSucces(succesMessage));
    setTimeout(() => {
      dispatch(statusActions.removeSucces());
    }, 3000);
  };
};
export const setErrorMessage = (errorMessage: string) => {
  return (dispatch: Dispatch<ISetErrorAction>) => {
    dispatch(statusActions.setError(errorMessage));
    setTimeout(() => {
      dispatch(statusActions.removeError());
    }, 3000);
  };
};

export default statusSlice;
