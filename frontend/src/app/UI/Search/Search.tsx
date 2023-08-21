"use client";
import { motion } from "framer-motion";
import classes from "./Search.module.scss";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className={classes.search}>
      <input type="text" placeholder="Enter game name" />
      <motion.button
        whileHover={{ boxShadow: "0", scale: 1.01, y: 1 }}
        transition={{ duration: 0.35 }}
      >
        <SearchIcon className={classes.icon} />
      </motion.button>
    </div>
  );
};

export default Search;
