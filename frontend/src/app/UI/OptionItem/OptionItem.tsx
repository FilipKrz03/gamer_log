"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import classes from "./OptionItem.module.scss";

type Props = {
  imagePath: string;
  desc: string;
  link: string;
};

const OptionItem = ({ imagePath, desc, link }: Props) => {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => {
        router.push(link);
      }}
      className={classes.item}
      whileHover={{
        rotate: "9deg",
        scale: 1.04,
        y: "-50px",
        border: "2px solid black",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      transition={{ duration: 0.185 }}
    >
      <Image src={imagePath} alt="Option Image" width={240} height={170} />
      <h2>{desc}</h2>
    </motion.div>
  );
};

export default OptionItem;
