"use client";
import { motion } from "framer-motion";
import { Genre } from "@/utils/types";
import classes from "./GenreItem.module.scss";
import { useState } from "react";

type Props = {
  genre: Genre;
  onChangeGenreFilter: (id: number) => void;
};

const GenreItem = ({ genre, onChangeGenreFilter }: Props) => {
  const [isItemActive, setIsItemActive] = useState(false);

  const changeActiveHandler = () => {
    onChangeGenreFilter(genre.id);
    setIsItemActive((prevState) => !prevState);
  };

  return (
    <motion.div
      className={`${classes.genre} ${isItemActive ? classes.active : ""}`}
      onClick={changeActiveHandler}
      whileTap={{ skew: -20, scale: 1.1, y: 5 }}
      transition={{ duration: 0.15 }}
    >
      {genre.name}
    </motion.div>
  );
};

export default GenreItem;
