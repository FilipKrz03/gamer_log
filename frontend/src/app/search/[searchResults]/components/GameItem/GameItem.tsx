import { Game } from "../../../../../../../types";
import classes from "./GameItem.module.scss";
import { forwardRef } from "react";

type Props = {
  gameItem: Game;
};

type Ref = HTMLDivElement;

const GameItem = forwardRef<Ref, Props>(({ gameItem }, ref) => {
  const content = ref ? (
    <div ref={ref}>
      <h1>{gameItem.name} element z refem</h1>{" "}
    </div>
  ) : (
    <div>
      {" "}
      <h1>{gameItem.name}</h1>{" "}
    </div>
  );

  return content;
});

GameItem.displayName = "Game Item";

export default GameItem;
