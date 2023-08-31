"use client";
import classes from "./FormTitle.module.scss";
import { motion } from "framer-motion";

type Props = {
  desc: string;
  bolderDesc: string;
};

const FormTitle = ({ desc, bolderDesc }: Props) => {
  return (
    <motion.div
      initial={{ y: -150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.65, duration: 0.4, ease: "easeInOut" }}
      className={classes.title}
    >
      <h1 className={classes.bolder}>{bolderDesc}</h1>
      <p>{desc}</p>
    </motion.div>
  );
};

export default FormTitle;
