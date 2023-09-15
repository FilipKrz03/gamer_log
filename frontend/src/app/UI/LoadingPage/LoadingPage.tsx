"use client";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import classes from "./LoadingPage.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className={classes.body}>
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [1, 0.7, 1] }}
        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
        className={classes["image-container"]}
      >
        <p>
          Gamer<span className={classes.log}>Log</span>
        </p>
        <Image
          priority={true}
          alt="Page logo"
          src={"/images/logo.png"}
          width={150}
          height={150}
        />
      </motion.div>
      <div className={classes["linear-box"]}>
        <LinearProgress color="secondary" />
      </div>
    </div>
  );
};

export default LoadingPage;
