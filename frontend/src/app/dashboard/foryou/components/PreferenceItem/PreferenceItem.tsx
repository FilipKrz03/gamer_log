"use client";
import classes from "./PreferenceItem.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
};

const PreferenceItem = ({ id, title }: Props) => {
  const [isItemActive, setIsItemActive] = useState(false);

  const changeActiveHandler = () => {
    setIsItemActive((prevState) => !prevState);
  };

  return (
    <motion.div
      className={`${classes.preference} ${isItemActive ? classes.active : ""}`}
      onClick={changeActiveHandler}
      whileTap={{ skew: -20, scale: 1.1, y: 5 }}
      transition={{ duration: 0.15 }}
    >
      {title}
    </motion.div>
  );
};

export default PreferenceItem;
