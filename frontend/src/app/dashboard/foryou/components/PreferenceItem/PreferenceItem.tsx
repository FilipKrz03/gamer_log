"use client";
import classes from "./PreferenceItem.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  isActive: boolean;
  onChangeItemActivity: (id: number) => void;
};

const PreferenceItem = ({
  id,
  title,
  isActive,
  onChangeItemActivity,
}: Props) => {
  const [isItemActive, setIsItemActive] = useState(isActive);

  const changeActiveHandler = () => {
    setIsItemActive((prevState) => !prevState);
    onChangeItemActivity(id);
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
