"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { setErrorMessage, setSuccesMessage } from "@/store/statusSlice";
import classes from "./PreferencesForm.module.scss";
import { Preferences } from "@/utils/types";
import PickPreference from "../PickPreference/PickPreference";
import Button from "@/app/UI/Button/Button";

type Props = {
  genres: Preferences[];
  platforms: Preferences[];
  tags: Preferences[];
  isEditing?: boolean;
  activeGenres?: number[];
  activePlatforms?: number[];
  activeTags?: number[];
  onSave: () => void;
};

const PreferencesForm = ({
  genres,
  platforms,
  tags,
  onSave,
  isEditing = false,
  activeGenres,
  activePlatforms,
  activeTags,
}: Props) => {
  const [formStep, setFormStep] = useState(1);

  const [pickedGenres, setPickedGenres] = useState<number[]>(
    activeGenres || []
  );
  const [pickedPlatforms, setPickedPlatforms] = useState<number[]>(
    activePlatforms || []
  );
  const [pickedTags, setPickedTags] = useState<number[]>(activeTags || []);

  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

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

  const submitFormHandler = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const requestPath = isEditing ? "/editpreferences" : "/preferences";
    if (pickedTags.length === 0)
      return dispatch(
        setErrorMessage("You need to pick at least one item") as any
      );
    try {
      await axiosPrivate.post(
        requestPath,
        JSON.stringify({
          genres: pickedGenres,
          platforms: pickedPlatforms,
          tags: pickedTags,
        })
      );
      dispatch(setSuccesMessage("Preferences saved") as any);
      onSave();
    } catch (err) {
      dispatch(setErrorMessage("Something went wrong") as any);
    }
  };

  return (
    <form className={classes.container} onSubmit={submitFormHandler}>
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
      {formStep !== 3 && (
        <Button
          desc="Save your preferences"
          isSubmit={false}
          isDisabled={true}
        />
      )}
      {formStep === 3 && (
        <Button
          desc="Save your preferences"
          isSubmit={true}
          isDisabled={false}
        />
      )}
    </form>
  );
};

export default PreferencesForm;
