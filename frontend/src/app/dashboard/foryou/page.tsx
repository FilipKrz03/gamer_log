import { getGenres, getPlafroms } from "@/lib/gamesApi";
import { Metadata } from "next";
import { Preferences } from "../../../../../types";
import PreferencesForm from "./components/PreferencesForm/PreferencesForm";

export const metadata: Metadata = {
  title: "For you",
};

export default async function ForYou() {
  const genres: Awaited<Preferences[]> = await getGenres();
  const platforms: Awaited<Preferences[]> = await getPlafroms();

  return <PreferencesForm genres={genres} platforms={platforms} />;
}
