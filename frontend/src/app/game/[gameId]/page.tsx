import GameDetails from "./components/GameDetails/GameDetails";
import { getSpecificGame } from "@/lib/gamesApi";
import { Game , Screenshots } from "../../../../../types";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { gameId: string };
}): Promise<Metadata> {
  const gameInfo: Awaited<{ game: Game }> = await getSpecificGame(
    parseInt(params.gameId)
  );
  return {
    title: gameInfo.game.name + " | GamerLog",
  };
}

export default async function GameInfo({
  params,
}: {
  params: { gameId: string };
}) {
  const gameInfo: Awaited<{ game: Game; screenshots: Screenshots }> =
    await getSpecificGame(parseInt(params.gameId));

  return (
    <GameDetails gameItem={gameInfo.game} screenshots={gameInfo.screenshots} />
  );
}
