"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import classes from "./NotFoundComponent.module.scss";

type Props = {
  message: string;
};

const NotFoundComponent = ({ message }: Props) => {
  return (
    <div className={classes.container}>
      <motion.h2
        initial={{ opacity: 0, y: "-50px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.2 }}
      >
        {message}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: "-150px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.2 }}
      >
        <Image
          src={"/images/404.svg"}
          alt="Not found image"
          width={600}
          height={450}
        />
      </motion.div>
    </div>
  );
};

export default NotFoundComponent;
