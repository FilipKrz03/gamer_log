"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Alert from "@/app/UI/Alert/Alert";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import classes from "./NewPassword.module.scss";
import ItemBox from "../ItemBox/ItemBox";
import Button from "@/app/UI/Button/Button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { setSuccesMessage, setErrorMessage } from "@/store/statusSlice";
import { isAxiosError, AxiosError } from "axios";
import { useState } from "react";
import LoadingBody from "@/app/UI/LoadingBody/LoadingBody";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const NewPassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const request = await axiosPrivate.post("/changepwd", {
        password: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (request.status === 200) {
        setLoading(false);
        dispatch(setSuccesMessage("Password changed") as any);
      }
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        dispatch(
          setErrorMessage(err.response?.data.message || err.message) as any
        );
      } else {
        dispatch(setErrorMessage("Something went wrong ") as any);
      }
    } finally {
      reset();
    }
  };

  return (
    <ItemBox>
      {loading && <LoadingBody />}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={textfieldTheme}>
          <div className={classes["input-control"]}>
            <TextField
              fullWidth
              type="password"
              label="Password"
              {...register("oldPassword", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.oldPassword && (
              <Alert message="Password need to be at least 6 characters long" />
            )}
          </div>
          <div className={classes["input-control"]}>
            <TextField
              fullWidth
              type="password"
              label="New password"
              {...register("newPassword", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.newPassword && (
              <Alert message="Password need to be at least 6 characters long" />
            )}
          </div>
          <div className={classes["input-control"]}>
            <TextField
              fullWidth
              type="password"
              label="Repeat password"
              {...register("repeatPassword", {
                required: true,
                minLength: 6,
                validate: (val: string) => {
                  if (watch("newPassword") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.repeatPassword && (
              <Alert
                message={
                  errors.repeatPassword.message || "Your passwords do no match"
                }
              />
            )}
          </div>
        </ThemeProvider>
        <Button isSubmit={true} desc="Change" />
      </form>
    </ItemBox>
  );
};

export default NewPassword;
