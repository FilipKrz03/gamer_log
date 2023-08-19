"use client";
import classes from "./InfoItem.module.scss";
import { motion } from "framer-motion";

type Props = {
  information: {
    icon: any;
    title: string;
    desc: string;
  };
};

const InfoItem = ({ information }: Props) => {
  const Icon = information.icon;
  return (
    <motion.div 
    initial={{opacity:0 , filter:'blur(2px)' , y:20}}
    animate={{opacity:1 , filter:'blur(0px)' , y:0}}
    transition={{delay:0.2 , duration:0.7}}
    className={classes.information}>
      <Icon fontSize="large" className={classes.icon} />
      <p>{information.desc}</p>
    </motion.div>
  );
};

export default InfoItem;
