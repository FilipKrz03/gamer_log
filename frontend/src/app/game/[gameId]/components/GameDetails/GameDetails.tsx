"use client";
import { Game , Screenshots } from "@/utils/types";
import classes from "./GameDetails.module.scss";
import MainSection from "../MainSection/MainSection";
import ScreensCaraousel from "../ScreensCaraousel/ScreensCaraousel";
import AsideDetails from "../AsideDetails/AsideDetails";

type Props = {
  gameItem: Game;
  screenshots: Screenshots;
};

const GameDetails = ({ gameItem, screenshots }: Props) => {
  return (
    <div className={classes.container}>
      <MainSection gameItem={gameItem} />
      <div
        className={classes.description}
        dangerouslySetInnerHTML={{ __html: gameItem.description }}
      />
      {screenshots.length > 0 && <ScreensCaraousel screenshots={screenshots} />}
      <AsideDetails gameItem={gameItem} />
    </div>
  );
};

export default GameDetails;
