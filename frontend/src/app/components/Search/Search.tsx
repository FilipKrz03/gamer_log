"use client";
import React from "react";
import classes from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
    
  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <input type="text" placeholder="Enter game name" />
      <button>
        <SearchIcon className={classes.icon} />
      </button>
    </form>
  );
};

export default Search;
