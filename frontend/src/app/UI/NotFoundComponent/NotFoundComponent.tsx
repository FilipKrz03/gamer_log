"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import classes from "./NotFoundComponent.module.scss";
import Button from "../Button/Button";

type Props = {
  message: string;
  link?: boolean;
};

const NotFoundComponent = ({ message, link }: Props) => {
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
          className={classes.image}
          src={"/images/404.svg"}
          alt="Game image"
          width={0}
          height={0}
          sizes="40vw"
          style={{
            aspectRatio: 2 / 1,
            width: "40vw",
            height: "auto",
            margin: "0 auto",
          }}
        />
      </motion.div>
      {link && <Button desc="Explore games" link="/explore" />}
    </div>
  );
};

export default NotFoundComponent;
