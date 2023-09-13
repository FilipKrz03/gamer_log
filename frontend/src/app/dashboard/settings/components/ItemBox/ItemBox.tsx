"use client";
import { motion } from "framer-motion";
import classes from "./ItemBox.module.scss";

type Props = {
  children: React.ReactNode;
};

const ItemBox = ({ children }: Props) => {
  return (
    <motion.div
      className={classes.box}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

export default ItemBox;
