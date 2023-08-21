import { getGenres, getPlafroms } from "@/lib/gamesApi";
import SearchBox from "./components/SearchBox/SearchBox";
import Title from "./components/Title/Title";

export default async function Search() {

  const genres = await getGenres();
  const platforms = await getPlafroms();

  return (
    <>
      <Title />
      <SearchBox genres={genres} platforms={platforms} />
    </>
  );
}
