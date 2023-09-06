"use client";
import { useState } from "react";
import classes from "./Options.module.scss";

type Props = {
  onSetOption: (option: string) => void;
};

const Options = ({ onSetOption }: Props) => {
  const [activeOption, setActiveOption] = useState("User info");

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
      <p className={classes["option-item"]}>Logout</p>
    </div>
  );
};

export default Options;
