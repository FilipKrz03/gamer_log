import { getGenres } from "@/lib/gamesApi";
import SearchBox from "./components/SearchBox/SearchBox";
import Title from "./components/Title/Title";

export default async function Search() {
  const genres = await getGenres();

  return (
    <>
      <Title />
      <SearchBox genres={genres} />
    </>
  );
}
