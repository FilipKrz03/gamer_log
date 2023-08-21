"use client";
import React from "react";
import classes from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className={classes.input}>
      <input type="text" placeholder="Enter game name" />
      <button>
        <SearchIcon className={classes.icon} />
      </button>
    </div>
  );
};

export default Search;
