"use client";
import { useState } from "react";
import Options from "../Options/Options";
import UserInfo from "../UserInfo/UserInfo";
import classes from "./MainContainer.module.scss";

const MainContainer = () => {
  const [option, setOption] = useState("User info");
  const onSetOption = (option: string) => {
    setOption(option);
  };
  return (
    <div className={classes["main-container"]}>
      <Options onSetOption={onSetOption} />
      {option === "User info" && <UserInfo />}
    </div>
  );
};

export default MainContainer;
