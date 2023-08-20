"use client";
import { useRef } from "react";
import classes from "./CountupSection.module.scss";
import CountUp from "react-countup";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import Image from "next/image";

const CountupSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const wasSeen = useIntersectionObserver(sectionRef, true)?.isIntersecting;

  return (
    <section className={classes.section} ref={sectionRef}>
      <motion.p
        initial={{ opacity: 0, filter: "blur(1px)", y: 15 }}
        animate={wasSeen && { opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
      A lot of <span className={classes.trusted}> truested </span> users :
      </motion.p>
      {wasSeen && (
        <CountUp
          className={classes.counter}
          start={100}
          end={1000000000}
          duration={5}
        />
      )}
    </section>
  );
};

export default CountupSection;
