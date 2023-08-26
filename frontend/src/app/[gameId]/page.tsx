import GameDetails from "./components/GameDetails/GameDetails";
import { getSpecificGame } from "@/lib/gamesApi";
import { headers } from "next/headers";
import { Game, Screenshots } from "../../../../types";

export default async function GameInfo() {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path")?.slice(1);
  const gameInfo: Awaited<{ game: Game; screenshots: Screenshots }> =
    await getSpecificGame(parseInt(activePath!));

  return (
    <GameDetails gameItem={gameInfo.game} screenshots={gameInfo.screenshots} />
  );
}
