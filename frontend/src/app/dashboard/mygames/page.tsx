import UserGames from "./components/UserGames";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My games | GamerLog",
};

export default async function MyGames() {
  return <UserGames />;
}
