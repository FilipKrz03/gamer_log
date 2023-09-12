"use client";
import { useState } from "react";
import classes from "./PreferencesForm.module.scss";
import { Preferences } from "../../../../../../../types";
import PickPreference from "../PickPreference/PickPreference";

type Props = {
  genres: Preferences[];
  platforms: Preferences[];
  tags: Preferences[];
};

const PreferencesForm = ({ genres, platforms, tags }: Props) => {
  const [formStep, setFormStep] = useState(1);

  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <h1>Tell us about your preferences</h1>
        <p>We will deliver titles based on what are you like </p>
      </div>
      {formStep === 1 && (
        <PickPreference
          preferenceTitle="Pick favourite genres"
          preferenceItems={genres}
        />
      )}
      {formStep === 2 && (
        <PickPreference
          preferenceTitle="Pick your platforms"
          preferenceItems={platforms}
        />
      )}
      {formStep === 3 && (
        <PickPreference
          preferenceTitle="Pick what you like"
          preferenceItems={tags}
        />
      )}
    </div>
  );
};

export default PreferencesForm;
