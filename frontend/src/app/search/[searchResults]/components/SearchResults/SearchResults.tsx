"use client";
import { usePathname } from "next/navigation";
import classes from "./SearchResults.module.scss";
import { useEffect } from "react";
import axios from "@/utils/axios";

const SearchResults = () => {
  const pathname = usePathname();
  const searchParams = pathname.slice(8);

  return <div>Pathname : {searchParams}</div>;
};

export default SearchResults;
