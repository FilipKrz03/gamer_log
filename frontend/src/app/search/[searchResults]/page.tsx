import { Metadata } from "next";
import SearchResults from "@/app/UI/SearchResults/SearchResults";

export const metadata: Metadata = {
  title: "Games | GamerLog",
};

export default function SearchResultsPage() {
  return <SearchResults />;
}
