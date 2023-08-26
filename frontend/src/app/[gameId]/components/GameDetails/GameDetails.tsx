"use client";
import { Game, Screenshots } from "../../../../../../types";
import classes from "./GameDetails.module.scss";
import MainSection from "../MainSection/MainSection";

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
    </div>
  );
};

export default GameDetails;
