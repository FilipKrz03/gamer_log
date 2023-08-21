"use client";
import {motion} from 'framer-motion';
import { Genre } from "../../../../../../types";
import classes from "./GenreItem.module.scss";
import { useState } from "react";

type Props = {
  genre: Genre;
};

const GenreItem = ({ genre }: Props) => {
  const [isItemActive, setIsItemActive] = useState(false);

  const changeActiveHandler = () => {
    setIsItemActive((prevState) => !prevState);
  };

  return (
    <motion.div
      className={`${classes.genre} ${isItemActive ? classes.active : ""}`}
      onClick={changeActiveHandler}
      whileTap={{skew:-20 , scale:1.1 , y:5}}
      transition={{duration:0.15}}
    
    >
      {genre.name}
    </motion.div>
  );
};

export default GenreItem;
