import { getGenres, getPlafroms, getTags } from "@/lib/gamesApi";
import { Metadata } from "next";
import { Preferences } from "@/utils/types";
import MainContainer from "./components/MainConainer/MainContainer";

export const metadata: Metadata = {
  title: "For you | GamerLog",
};

export default async function ForYou() {
  const genres: Awaited<Preferences[]> = await getGenres();
  const platforms: Awaited<Preferences[]> = await getPlafroms();
  const tags: Awaited<Preferences[]> = await getTags();

  return <MainContainer genres={genres} platforms={platforms} tags={tags} />;
}
