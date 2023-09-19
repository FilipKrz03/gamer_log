"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Alert from "@/app/UI/Alert/Alert";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import ItemBox from "../ItemBox/ItemBox";
import Button from "@/app/UI/Button/Button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { setSuccesMessage, setErrorMessage } from "@/store/statusSlice";
import { isAxiosError, AxiosError } from "axios";
import classes from "./NewUsername.module.scss";
import LoadingBody from "@/app/UI/LoadingBody/LoadingBody";


type Inputs = {
  password: string;
  newUsername: string;
  repeatUsername: string;
};

const NewUsername = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading , setLoading] = useState(false);
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
      const request = await axiosPrivate.post("/changeusr", {
        password: data.password,
        newUsername: data.newUsername,
      });
      if (request.status === 200) {
        setLoading(false);
        dispatch(setSuccesMessage("Username changed") as any);
        router.refresh();
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
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && (
              <Alert message="Password need to be at least 6 characters long" />
            )}
          </div>
          <div className={classes["input-control"]}>
            <TextField
              fullWidth
              label="New Username"
              {...register("newUsername", {
                required: true,
                minLength: 3,
              })}
            />
            {errors.newUsername && (
              <Alert message="Username need to be at least 3 characters long" />
            )}
          </div>
          <div className={classes["input-control"]}>
            <TextField
              fullWidth
              label="Repeat Username"
              {...register("repeatUsername", {
                required: true,
                minLength: 3,
                validate: (val: string) => {
                  if (watch("newUsername") !== val) {
                    return "Your usernames do no match";
                  }
                },
              })}
            />
            {errors.repeatUsername && (
              <Alert
                message={
                  errors.repeatUsername.message || "Your usernames do no match"
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

export default NewUsername;
