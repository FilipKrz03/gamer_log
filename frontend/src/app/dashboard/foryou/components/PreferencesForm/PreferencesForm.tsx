"use client";
import { useState } from "react";
import classes from "./PreferencesForm.module.scss";
import { Preferences } from "../../../../../../../types";
import PickPreference from "../PickPreference/PickPreference";

type Props = {
  genres: Preferences[];
  platforms: Preferences[];
};

const PreferencesForm = ({ genres, platforms }: Props) => {
  const [formStep, setFormStep] = useState(1);

  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <h1>Tell us about your preferences</h1>
        <p>We will deliver titles based on what are you like </p>
      </div>
      <PickPreference
        preferenceTitle="Pick favourite genres"
        preferenceItems={genres}
      />
    </div>
  );
};

export default PreferencesForm;
