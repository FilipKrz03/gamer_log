"use client";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import { motion } from "framer-motion";
import classes from "./RegisterForm.module.scss";
import Button from "@/app/UI/Button/Button";
import Alert from "@/app/UI/Alert/Alert";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <motion.form
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      onSubmit={handleSubmit(onSubmit)}
      className={classes.form}
    >
      <ThemeProvider theme={textfieldTheme}>
        <div className={classes["input-control"]}>
          <TextField
            className={classes.field}
            fullWidth
            label="Email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <Alert message="Enter valid email adress" />}
        </div>
        <div className={classes["input-control"]}>
          <TextField
            className={classes.field}
            type="password"
            fullWidth
            label="Password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <Alert message="Password need to be at least 6 characters long" />
          )}
        </div>
        <div className={classes["input-control"]}>
          <TextField
            className={classes.field}
            type="password"
            fullWidth
            label="Password"
            {...register("repeatPassword", {
              required: true,
              minLength: 6,
              validate: (val: string) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
          />
          {errors.repeatPassword && (
            <Alert message={errors.repeatPassword.message! || "Your passwords do no match"} />
          )}
        </div>
        <Button desc="Log in" isSubmit={true} />
      </ThemeProvider>
      <p>
        Already have an account ? <Link href={"/login"}>Log in</Link>
      </p>
    </motion.form>
  );
};

export default RegisterForm;
