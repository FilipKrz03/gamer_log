"use client";
import { usePathname } from "next/navigation";
import classes from "./SearchResults.module.scss";
import React, { useState, useRef, useCallback } from "react";
import GameItem from "../GameItem/GameItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Game } from "../../../../../../../types";

const SearchResults = () => {
  const pathname = usePathname();
  const searchParams = pathname.slice(8);

  const [pageNumber, setPageNumber] = useState(1);

  const intObserver = useRef<IntersectionObserver>();

  const {
    isLoading,
    error,
    results: games,
    maxResultsCount,
  } = useInfiniteScroll(pageNumber, searchParams);

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

  const gamesItems = games.map((game: Game, i: number) => {
    if (i + 1 === games.length) {
      return <GameItem key={game.name} gameItem={game} ref={lastPostRef} />;
    } else {
      return <GameItem key={game.name} gameItem={game} />;
    }
  });

  return (
    <div className={classes.container}>
      {gamesItems}
      {isLoading && <p>Loading .... </p>}
    </div>
  );
};

export default SearchResults;
