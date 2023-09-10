import { useState, useEffect, useRef } from "react";
import { getSearchedGames } from "@/lib/gamesApi";
import { Games } from "../../../types";
import useAxiosPrivate from "./useAxiosPrivate";

const useInfiniteScroll = (
  pageNumber: number,
  searchParams: string,
  isFromUserData: boolean,
  dataPath?: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<any>([]);
  const [maxResultsCount, setMaxResultsCount] = useState(200);
  const firstUpdate = useRef(true);
  
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function fetchGames() {
      try {
        setIsLoading(true);
        const games: Awaited<Games> = !isFromUserData
          ? await getSearchedGames(`/search?${searchParams}&page=${pageNumber}`)
          : (await axiosPrivate.get(`/${dataPath}?&page=${pageNumber}`)).data;
        if (firstUpdate.current === true) {
          setMaxResultsCount(games.count > 200 ? 200 : games.count);
          firstUpdate.current = false;
        }
        setResults((prevResults: any) => [...prevResults, ...games.results]);
        setIsLoading(false);
      } catch (err) {
        setError(true);
      }
    }
    fetchGames();
  }, [pageNumber, searchParams, axiosPrivate, isFromUserData, dataPath]);
  return { isLoading, error, results, maxResultsCount };
};

export default useInfiniteScroll;
