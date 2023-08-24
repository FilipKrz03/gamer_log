import { getSpecificGame } from "@/lib/gamesApi";
import { headers } from "next/headers";

export default async function GameInfo() {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path")?.slice(1);
  const gameInfo = await getSpecificGame(parseInt(activePath!));

  return <div>{activePath}</div>;
}
