"use client";
import classes from "./Button.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  desc: string;
  link?: string;
  isError?: boolean;
};

const Button = ({ desc, link, isError }: Props) => {
  const router = useRouter();

  const routeHandler = () => {
    if (isError === true) router.back();
    if (!link) return;
    router.push(link);
  };

  return (
    <motion.button
      whileHover={{ y: 3, boxShadow: "0" }}
      className={classes.button}
      onClick={routeHandler}
    >
      {desc}
    </motion.button>
  );
};

export default Button;
