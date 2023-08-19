"use client";
import classes from "./Button.module.scss";
import { useRouter } from "next/navigation";
import {motion} from 'framer-motion';

type Props = {
  desc: string;
  link?: string;
};

const Button = ({ desc, link }: Props) => {
  const router = useRouter();

  const routeHandler = () => {
    if (!link) return;
    router.push(link);
  };

  return (
    <motion.button
    whileHover={{y:3 , boxShadow:'0'}}
    className={classes.button} onClick={routeHandler}>
      {desc}
    </motion.button>
  );
};

export default Button;
