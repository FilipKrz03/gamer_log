"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Alert from "@/app/UI/Alert/Alert";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import classes from "./NewPassword.module.scss";
import ItemBox from "../ItemBox/ItemBox";
import Button from "@/app/UI/Button/Button";

type Inputs = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <ItemBox>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={textfieldTheme}>
          <div className={classes["input-control"]}>
            <TextField
              fullWidth
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
