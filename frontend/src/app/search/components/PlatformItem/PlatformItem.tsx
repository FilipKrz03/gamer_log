"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Platform } from "@/utils/types";
import classes from "./PlatformItem.module.scss";


type Props = {
  platform: Platform;
  onChangePlatformFilter: (id: number) => void;
};

const PlatformItem = ({ platform, onChangePlatformFilter }: Props) => {
  const [isItemActive, setIsItemActive] = useState(false);

  const itemChangeHandler = () => {
    onChangePlatformFilter(platform.id);
    setIsItemActive((prevState) => !prevState);
  };

  return (
    <motion.div
      whileTap={{ skew: -20, scale: 1.1, y: 5 }}
      transition={{ duration: 0.15 }}
      className={`${classes.platform} ${isItemActive ? classes.active : ""}`}
      onClick={itemChangeHandler}
    >
      {platform.name}
    </motion.div>
  );
};

export default PlatformItem;
