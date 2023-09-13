"use client";
import { useState, useEffect } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "@/store/statusSlice";
import PreferencesForm from "../PreferencesForm/PreferencesForm";
import SearchResults from "@/app/UI/SearchResults/SearchResults";
import LoadingPage from "@/app/UI/LoadingPage/LoadingPage";
import { Preferences } from "../../../../../../../types";
import classes from "./MainContainer.module.scss";

type Props = {
  genres: Preferences[];
  platforms: Preferences[];
  tags: Preferences[];
};

const MainContainer = ({ genres, platforms, tags }: Props) => {
  const [hasUserPreferences, setHasUserPreferences] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pickedGenres, setPickedGenres] = useState<number[]>([]);
  const [pickedPlatforms, setPickedPlatforms] = useState<number[]>([]);
  const [pickedTags, setPickedTags] = useState<number[]>([]);

  const [showGames, setShowGames] = useState(true);

  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPreferences() {
      try {
        setIsLoading(true);
        const res = await axiosPrivate.get("/preferences");
        if (res.status === 200) {
          setPickedGenres(JSON.parse(res.data.preferences.genres));
          setPickedPlatforms(JSON.parse(res.data.preferences.platforms));
          setPickedTags(JSON.parse(res.data.preferences.tags));
          setHasUserPreferences(true);
        }
      } catch (err) {
        dispatch(setErrorMessage("Something went wrong") as any);
      } finally {
        setIsLoading(false);
      }
    }
    if (showGames) fetchPreferences();
  }, [axiosPrivate, dispatch, hasUserPreferences, showGames]);

  const genreString = `${"&genres=" + pickedGenres.map((filter) => filter)}`;
  const platformString = `${
    "&platforms=" + pickedPlatforms.map((filter) => filter)
  }`;
  const tagsString = `${"&tags=" + pickedTags.map((filter) => filter)}`;
  const searchString = `
   "&search="${genreString}${platformString}${tagsString}`;

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading && !hasUserPreferences && (
        <PreferencesForm
          genres={genres}
          platforms={platforms}
          tags={tags}
          onSave={() => {
            setHasUserPreferences(true);
          }}
        />
      )}

      {!isLoading && hasUserPreferences && (
        <div className={classes.container}>
          <div className={classes.options}>
            <p
              className={`${classes["option-item"]} ${
                showGames === true ? classes.active : ""
              }`}
              onClick={() => {
                setShowGames(true);
              }}
            >
              Games for you
            </p>
            <p
              className={`${classes["option-item"]} ${
                showGames === false ? classes.active : ""
              }`}
              onClick={() => {
                setShowGames(false);
              }}
            >
              Modife your preferences
            </p>
          </div>
          {showGames && <SearchResults ownSearchParams={searchString} />}
          {!showGames && (
            <PreferencesForm
              genres={genres}
              platforms={platforms}
              tags={tags}
              onSave={() => {
                setShowGames(true);
              }}
              activeGenres={pickedGenres}
              activePlatforms={pickedPlatforms}
              activeTags={pickedTags}
              isEditing={true}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MainContainer;
