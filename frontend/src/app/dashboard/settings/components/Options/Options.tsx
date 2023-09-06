"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import classes from "./Options.module.scss";
import axios from "@/utils/axios";
import { userActions } from "@/store/userSlice";
import { setErrorMessage } from "@/store/statusSlice";

type Props = {
  onSetOption: (option: string) => void;
};

const Options = ({ onSetOption }: Props) => {
  const [activeOption, setActiveOption] = useState("User info");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/logout", {
        withCredentials: true,
      });
      dispatch(userActions.logoutUser());
      router.push("/");
    } catch (err) {
      dispatch(setErrorMessage("Something went wrong") as any);
    }
  };

  return (
    <div className={classes.options}>
      <p
        className={`${classes["option-item"]} ${
          activeOption === "User info" ? classes.active : ""
        }`}
        onClick={() => {
          setActiveOption("User info");
          onSetOption("User info");
        }}
      >
        User info
      </p>
      <p
        className={`${classes["option-item"]} ${
          activeOption === "Change password" ? classes.active : ""
        }`}
        onClick={() => {
          setActiveOption("Change password");
          onSetOption("Change password");
        }}
      >
        Change password
      </p>
      <p
        className={`${classes["option-item"]} ${
          activeOption === "Change username" ? classes.active : ""
        }`}
        onClick={() => {
          setActiveOption("Change username");
          onSetOption("Change username");
        }}
      >
        Change username
      </p>
      <p className={classes["option-item"]} onClick={handleLogout}>
        Logout
      </p>
    </div>
  );
};

export default Options;
