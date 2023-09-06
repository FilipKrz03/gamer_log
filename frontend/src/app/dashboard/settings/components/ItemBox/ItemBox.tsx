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
      animate={{ x: 0, filter: "blur(0px)" }}
      initial={{ x: -200, filter: "blur(2px)" }}
      transition={{duration:0.4}}
    >   
      {children}
    </motion.div>
  );
};

export default ItemBox;
