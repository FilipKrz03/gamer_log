"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Preferences } from "../../../../../../../types";
import PreferenceItem from "../PreferenceItem/PreferenceItem";
import classes from "./PickPreference.module.scss";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

type Props = {
  preferenceTitle: string;
  preferenceItems: Preferences[];
  activePreferences: number[];
  onStepChange: (isFoward: boolean) => void;
  onItemsActivityChange: (itemsArr: number[]) => void;
};

const PickPreference = ({
  preferenceTitle,
  preferenceItems,
  activePreferences,
  onStepChange,
  onItemsActivityChange,
}: Props) => {
  const [activeItems, setActiveItems] = useState<number[]>(activePreferences);

  const changeItemActivityHandler = (id: number) => {
    let isFound = false;
    activeItems.map((item) => {
      if (item === id) {
        isFound = true;
        const newItems = activeItems.filter((item) => item !== id);
        onItemsActivityChange(newItems);
        return setActiveItems(newItems);
      }
    });
    if (!isFound) {
      setActiveItems([...activeItems, id]);
      onItemsActivityChange([...activeItems, id]);
    }
  };

  const changeStepHandler = (isForward: boolean) => {
    onStepChange(isForward);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0.2 }}
      transition={{ duration: 0.4 }}
      className={classes.container}
    >
      <h2>{preferenceTitle}</h2>
      <div className={classes["preference-box"]}>
        {preferenceItems.map((preference) => {
          const isActive = activeItems.includes(preference.id);
          return (
            <PreferenceItem
              isActive={isActive}
              onChangeItemActivity={changeItemActivityHandler}
              key={preference.id}
              id={preference.id}
              title={preference.name}
            />
          );
        })}
      </div>
      <div
        className={`${classes.icon} ${classes.back}`}
        onClick={changeStepHandler.bind(null, false)}
      >
        <ArrowBackIosNewOutlinedIcon className={classes.arrow} />
      </div>
      <div
        className={`${classes.icon} ${classes.forward}`}
        onClick={changeStepHandler.bind(null, true)}
      >
        <ArrowForwardIosOutlinedIcon className={classes.arrow} />
      </div>
    </motion.div>
  );
};

export default PickPreference;
