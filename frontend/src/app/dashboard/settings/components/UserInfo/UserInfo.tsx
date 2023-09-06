"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { TextField, ThemeProvider } from "@mui/material";
import { textfieldTheme } from "@/utils/themes";
import classes from "./UserInfo.module.scss";
import ItemBox from "../ItemBox/ItemBox";

const UserInfo = () => {
  const userInfo = useSelector((state: RootState) => state.users);
  return (
    <ItemBox>
      <div className={classes.info}>
        <ThemeProvider theme={textfieldTheme}>
          <TextField value={userInfo.email} label="Email" focused fullWidth />
          <TextField
            value={userInfo.username}
            label="Username"
            focused
            fullWidth
          />
        </ThemeProvider>
      </div>
    </ItemBox>
  );
};

export default UserInfo;
