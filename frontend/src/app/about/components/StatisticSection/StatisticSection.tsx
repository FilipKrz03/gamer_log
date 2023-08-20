"use client";
import classes from "./StatisticSection.module.scss";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRef } from "react";
import Image from "next/image";
import { statisticItems } from "@/utils/consts";
import { motion } from "framer-motion";

const StatisticSection = () => {

  let delay = -0.4;

  const statsRef = useRef<HTMLElement | null>(null);
  const wasSeen = useIntersectionObserver(statsRef, true)?.isIntersecting;

  return (
    <section className={classes.section} ref={statsRef}>
      <Image
        src={"/images/smartphone.png"}
        alt="Image of smartphone with GamerLog website"
        width={260}
        height={450}
        className={classes.image}
      />
      {wasSeen && (
        <div className={classes["stats-container"]}>
          {statisticItems.map((item) => {
            const Icon = item.icon;
            delay += 0.5;
            return (
              <motion.div
                key={item.desc}
                className={classes.item}
                animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                initial={{ opacity: 0, filter: "blur(3px)", x: 70 }}
                transition={{ duration: 0.6, delay: delay }}
              >
                <div className={classes["icon-container"]}>
                  <Icon fontSize="large" className={classes.icon} />
                </div>
                <div className={classes.desc}>
                  <h3>{item.number} + </h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default StatisticSection;
