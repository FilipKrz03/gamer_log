import SearchBox from "./components/SearchBox/SearchBox";
import Title from "./components/Title/Title";
import { getGenres } from "@/lib/getGenres";

export default async function Search() {
  const genres = await getGenres();

  return (
    <>
      <Title />
      <SearchBox genres={genres} />
    </>
  );
}
