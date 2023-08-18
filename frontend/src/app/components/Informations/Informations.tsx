"use client";
import classes from "./Informations.module.scss";
import { informations } from "@/utils/consts";

const Informations = () => {
  return (
    <section className={classes.information}>
      {informations.map((information) => {
        const Icon = information.icon;
        return (
          <div key={information.desc} className={classes["information-item"]}>
            <div className={classes['icon-box']}>
              <Icon className={classes.icon}/>
            </div>
            <h3>{information.title}</h3>
            <p>{information.desc}</p>
          </div>
        );
      })}
    </section>
  );
};

export default Informations;
