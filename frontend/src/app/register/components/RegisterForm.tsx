"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import { motion } from "framer-motion";
import classes from "./RegisterForm.module.scss";
import Button from "@/app/UI/Button/Button";
import Alert from "@/app/UI/Alert/Alert";
import axios from "@/utils/axios";
import LoadingBody from "@/app/UI/LoadingBody/LoadingBody";
import Success from "@/app/UI/Success/Success";
import { AxiosError, isAxiosError } from "axios";
import { RootState } from "@/store";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
};

const RegisterForm = () => {
  const [showSucces, setShowSucces] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const isLogged = useSelector((state: RootState) => state.users.isLogged);

  useEffect(() => {
    if (isLogged) return router.push("/dashboard");
  }, [isLogged, router]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setErrMessage("");
    setShowError(false);
    setShowSucces(false);
    try {
      await axios.post("/register", {
        email: data.email,
        password: data.password,
        username: data.username,
      });
      setShowSucces(true);
    } catch (err: AxiosError | any) {
      setShowError(true);
      if (isAxiosError(err)) {
        setErrMessage(err.response?.data.message || err.message);
      }
    } finally {
      setLoading(false);
      reset();
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
        {showSucces && (
          <Success message="Account created" linkDesc="Log In" link="/login" />
        )}
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
              fullWidth
              label="Username"
              {...register("username", {
                required: true,
                minLength: 3,
              })}
            />
            {errors.username && (
              <Alert message="Username needs to be at least 3 characters length" />
            )}
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
              label="Repeat password"
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
              <Alert
                message={
                  errors.repeatPassword.message! || "Your passwords do no match"
                }
              />
            )}
          </div>
          <Button desc="Register" isSubmit={true} />
        </ThemeProvider>
        <p>
          Already have an account ? <Link href={"/login"}>Log in</Link>
        </p>
      </motion.form>
    </>
  );
};

export default RegisterForm;
