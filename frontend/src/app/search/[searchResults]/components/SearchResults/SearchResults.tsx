"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Search from "@/app/UI/Search/Search";
import GameItem from "../GameItem/GameItem";
import Skeletons from "@/app/UI/Skeletons/Skeletons";
import NotFoundComponent from "@/app/UI/NotFoundComponent/NotFoundComponent";
import { Game } from "../../../../../../../types";
import classes from "./SearchResults.module.scss";

type Props = {
  isUserData?: boolean;
};

const SearchResults = ({ isUserData = false }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = pathname.slice(8);

  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const intObserver = useRef<IntersectionObserver>();

  const {
    isLoading,
    error,
    results: games,
    maxResultsCount,
  } = useInfiniteScroll(pageNumber, searchParams, isUserData);

  const lastPostRef = useCallback(
    (item: HTMLDivElement) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(
        (items: IntersectionObserverEntry[]) => {
          if (items[0].isIntersecting && pageNumber * 25 < maxResultsCount) {
            setPageNumber((prevState) => prevState + 1);
          }
        }
      );
      if (item) intObserver.current.observe(item);
    },
    [pageNumber, maxResultsCount, isLoading]
  );

  const getInputValue = (inputValue: string) => {
    setSearchValue(inputValue);
  };

  const submitFormHandler = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = searchValue !== "" ? "&search=" + searchValue : "&all";
    router.push(`/search/${path}`);
  };

  const gamesItems = games.map((game: any, i: number) => {
    if (i + 1 === games.length) {
      return (
        <GameItem
          isFromDb={isUserData}
          key={game.name}
          gameItem={!isUserData ? game : undefined}
          dbGameItem={isUserData ? game : undefined}
          ref={lastPostRef}
        />
      );
    } else {
      return (
        <GameItem
          isFromDb={isUserData}
          key={game.name}
          gameItem={!isUserData ? game : undefined}
          dbGameItem={isUserData ? game : undefined}
        />
      );
    }
  });

  return (
    <div className={classes.page}>
      <form onSubmit={submitFormHandler}>
        <div className={classes.search}>
          <Search onFormSubmit={getInputValue} />
        </div>
      </form>
      <div className={classes.container}>
        {games.length > 0 && gamesItems}
        {isLoading && <Skeletons />}
        {isLoading === false && games.length === 0 && (
          <NotFoundComponent message="We could not find you search." />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
