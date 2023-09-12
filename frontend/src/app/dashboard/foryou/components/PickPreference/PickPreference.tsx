"use client";
import { Preferences } from "../../../../../../../types";
import PreferenceItem from "../PreferenceItem/PreferenceItem";
import classes from "./PickPreference.module.scss";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

type Props = {
  preferenceTitle: string;
  preferenceItems: Preferences[];
};

const PickPreference = ({ preferenceTitle, preferenceItems }: Props) => {
  return (
    <div className={classes.container}>
      <h2>{preferenceTitle}</h2>
      <div className={classes["preference-box"]}>
        {preferenceItems.map((preference) => {
          return (
            <PreferenceItem
              key={preference.id}
              id={preference.id}
              title={preference.name}
            />
          );
        })}
      </div>
      <div className={`${classes.icon} ${classes.back}`}>
        <ArrowBackIosNewOutlinedIcon className={classes.arrow} />
      </div>
      <div className={`${classes.icon} ${classes.forward}`}>
        <ArrowForwardIosOutlinedIcon className={classes.arrow} />
      </div>
    </div>
  );
};

export default PickPreference;
