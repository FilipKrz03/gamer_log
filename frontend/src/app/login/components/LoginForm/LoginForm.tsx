"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import { motion } from "framer-motion";
import classes from "./LoginForm.module.scss";
import Button from "@/app/UI/Button/Button";
import Alert from "@/app/UI/Alert/Alert";
import axios from "@/utils/axios";
import LoadingBody from "@/app/UI/LoadingBody/LoadingBody";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [showError, setShowError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setErrMessage("");
    setShowError(false);
    try {
      const login = await axios.post("/login", {
        email: data.email,
        password: data.password,
      });
      console.log(login);
    } catch (err) {
      setShowError(true);
      if (typeof err === "string") {
        setErrMessage(err.toUpperCase());
      } else if (err instanceof Error) {
        setErrMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingBody />}
      <motion.form
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        onSubmit={handleSubmit(onSubmit)}
        className={classes.form}
      >
        {showError && <Alert message={errMessage} isBig={true} />}
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
          <Button desc="Log in" isSubmit={true} />
        </ThemeProvider>
        <p>
          Do not have account ? <Link href={"/register"}>Sign up</Link>
        </p>
      </motion.form>
    </>
  );
};

export default LoginForm;
