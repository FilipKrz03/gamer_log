"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import classes from "./OptionItem.module.scss";

type Props = {
  imagePath: string;
  desc: string;
};

const OptionItem = ({ imagePath, desc }: Props) => {
  return (
    <motion.div
      className={classes.item}
      whileHover={{
        rotate: "9deg",
        scale:1.040,
        y: "-50px",
        border:'2px solid black' , 
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      transition={{duration:0.185,}}
    >
      <Image src={imagePath} alt="Option Image" width={240} height={170} />
      <h2>{desc}</h2>
    </motion.div>
  );
};

export default OptionItem;
