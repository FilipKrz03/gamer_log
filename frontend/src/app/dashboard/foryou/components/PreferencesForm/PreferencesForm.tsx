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

  const [pickedGenres, setPickedGenres] = useState<number[]>([]);
  const [pickedPlatforms, setPickedPlatforms] = useState<number[]>([]);
  const [pickedTags, setPickedTags] = useState<number[]>([]);

  const changeGenresActivity = (activeGenres: number[]) => {
    setPickedGenres(activeGenres);
  };

  const changePlatformsActivity = (activePlatforms: number[]) => {
    setPickedPlatforms(activePlatforms);
  };

  const changeTagsActivity = (activeTags: number[]) => {
    setPickedTags(activeTags);
  };

  const stepChangheHandler = (isForward: boolean) => {
    if (isForward && formStep === 3) return;
    if (!isForward && formStep === 1) return;
    if (isForward) setFormStep((prevValue) => prevValue + 1);
    if (!isForward) setFormStep((prevValue) => prevValue - 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.description}>
        <h1>Tell us about your preferences</h1>
        <p>We will deliver titles based on what are you like </p>
      </div>
      {formStep === 1 && (
        <PickPreference
          activePreferences={pickedGenres}
          preferenceTitle="Pick favourite genres"
          preferenceItems={genres}
          onStepChange={stepChangheHandler}
          onItemsActivityChange={changeGenresActivity}
        />
      )}
      {formStep === 2 && (
        <PickPreference
          activePreferences={pickedPlatforms}
          preferenceTitle="Pick your platforms"
          preferenceItems={platforms}
          onStepChange={stepChangheHandler}
          onItemsActivityChange={changePlatformsActivity}
        />
      )}
      {formStep === 3 && (
        <PickPreference
          activePreferences={pickedTags}
          preferenceTitle="Pick what you like"
          preferenceItems={tags}
          onStepChange={stepChangheHandler}
          onItemsActivityChange={changeTagsActivity}
        />
      )}
      <div className={classes["progres-dots"]}>
        <div
          className={`${classes.dot} ${formStep === 1 ? classes.active : ""}`}
        />
        <div
          className={`${classes.dot} ${formStep === 2 ? classes.active : ""}`}
        />
        <div
          className={`${classes.dot} ${formStep === 3 ? classes.active : ""}`}
        />
      </div>
    </div>
  );
};

export default PreferencesForm;
