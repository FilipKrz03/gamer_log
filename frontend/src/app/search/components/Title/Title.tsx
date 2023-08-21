"use client";
import classes from "./Title.module.scss";
import {motion} from 'framer-motion';

const Title = () => {
  return (
    <motion.div className={classes["title-box"]}
    initial={{skewX:0 , scale:0.9 , opacity:0.6}}
    animate={{skewX:[-10 , 10 , 0] , scale:[0.8 , 1] , opacity:1}}
    transition={{delay:0.05 , duration:0.35}}
    >
      <h2>Search for games</h2>
    </motion.div>
  );
};

export default Title;
