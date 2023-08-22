"use client";
import React, { useState, useCallback } from "react";
import classes from "./SearchBox.module.scss";
import { Genre } from "../../../../../../types";
import { Platform } from "../../../../../../types";
import PlatformItem from "../PlatformItem/PlatformItem";
import GenreItem from "../GenreItem/GenreItem";
import Search from "@/app/UI/Search/Search";

type Props = {
  genres: Genre[];
  platforms: Platform[];
};

const SearchBox = ({ genres, platforms }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [genreFilters, setGenreFilters] = useState<number[]>([]);
  const [platformFilters, setPlatformFilters] = useState<number[]>([]);

  const submitFormHandler = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const genreString = `${
      genreFilters.length > 0
        ? "&genres=" + genreFilters.map((filter) => filter)
        : ""
    }`;
    const platformString = `${
      platformFilters.length > 0
        ? "&platforms=" + platformFilters.map((filter) => filter)
        : ""
    }`;
    const searchString = `${
      inputValue !== "" ? "&search=" + inputValue : ""
    }${genreString}${platformString}`;
  };

  const getInputValue = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const changeGendreFilter = (id: number) => {
    let modifiredGenreFilters: number[] = [];
    const genreItem = genreFilters.find((item) => item === id);
    if (genreItem) {
      modifiredGenreFilters = genreFilters.filter((item) => item !== id);
    } else {
      modifiredGenreFilters = [...genreFilters, id];
    }
    setGenreFilters(modifiredGenreFilters);
  };

  const changePlatformFilter = (id: number) => {
    let modifiredPlatformFilters: number[] = [];
    const platformItem = platformFilters.find((item) => item === id);
    if (platformItem) {
      modifiredPlatformFilters = platformFilters.filter((item) => item !== id);
    } else {
      modifiredPlatformFilters = [...platformFilters, id];
    }
    setPlatformFilters(modifiredPlatformFilters);
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes["parametrs-box"]}>
        <div className={classes.left}>
          <p>Platforms</p>
          <div className={classes["box"]}>
            {platforms.map((platformItem) => {
              return (
                <PlatformItem
                  key={platformItem.id}
                  platform={platformItem}
                  onChangePlatformFilter={changePlatformFilter}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.right}>
          <p>Categories</p>
          <div className={classes["box"]}>
            {genres.map((genreItem) => {
              return (
                <GenreItem
                  key={genreItem.id}
                  genre={genreItem}
                  onChangeGenreFilter={changeGendreFilter}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Search onFormSubmit={getInputValue} />
    </form>
  );
};

export default SearchBox;
