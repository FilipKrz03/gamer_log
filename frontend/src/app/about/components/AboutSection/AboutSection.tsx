"use client";
import Informations from "@/app/components/Informations/Informations";
import InfoItem from "../InfoItem/InfoItem";
import classes from "./AboutSection.module.scss";
import { informations } from "@/utils/consts";
import Image from "next/image";

const AboutSection = () => {
  const informationsLeft = informations.slice(0, 2);
  const informationCenter = informations[2];
  const informationsRight = informations.slice(3, 5);

  return (
    <section className={classes.section}>
      <div className={classes.desc}>
        <h1>
          How GamerLog <span className={classes.works}> works </span>
        </h1>
        <p>No complicated settings</p>
        <p>No payments . No subscriptions</p>
      </div>
      <div className={classes["main-content"]}>
        <div className={classes["side-column"]}>
          {informationsLeft.map((information) => {
            return (
              <InfoItem key={information.title} information={information} />
            );
          })}
        </div>
        <div className={classes["main-column"]}>
          <Image
            src={"/images/about.svg"}
            alt="About photo"
            width={585}
            height={350}
          />
        </div>
        <div className={classes["side-column"]}>
          {informationsRight.map((information) => {
            return (
              <InfoItem key={information.title} information={information} />
            );
          })}
        </div>
      </div>
      <InfoItem information={informationCenter} />
    </section>
  );
};

export default AboutSection;
