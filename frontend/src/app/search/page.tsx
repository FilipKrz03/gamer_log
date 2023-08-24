import { Metadata } from "next";
import { getGenres, getPlafroms } from "@/lib/gamesApi";
import SearchBox from "./components/SearchBox/SearchBox";
import Title from "./components/Title/Title";

export const metadata: Metadata = {
  title: "Search | GamerLog",
};

export default async function Search() {
  const genres = await getGenres();
  const platforms = await getPlafroms();

  return (
    <main
      style={{
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Title />
      <SearchBox genres={genres} platforms={platforms} />
    </main>
  );
}
