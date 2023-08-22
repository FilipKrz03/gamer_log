"use client";
import { use, useRef } from "react";
import { motion } from "framer-motion";
import classes from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  onFormSubmit?: (inputVal: string) => void;
};

const Search = ({ onFormSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={classes.search}>
      <input type="text" placeholder="Enter game name" ref={inputRef} />
      <motion.button
        onClick={() => {
          onFormSubmit!(inputRef.current!.value);
        }}
        whileHover={{ boxShadow: "0", scale: 1.01, y: 1 }}
        transition={{ duration: 0.35 }}
      >
        <SearchIcon className={classes.icon} />
      </motion.button>
    </div>
  );
};

export default Search;
