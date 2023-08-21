"use client";
import { ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField/TextField";
import classes from "./SearchBox.module.scss";
import { textfieldTheme } from "@/utils/themes";

const SearchBox = () => {
  return (
    <form className={classes.form}>
      <div className={classes.left}>
        <ThemeProvider theme={textfieldTheme}>
          <TextField label="Game" variant="outlined"/>
        </ThemeProvider>
      </div>
    </form>
  );
};

export default SearchBox;
