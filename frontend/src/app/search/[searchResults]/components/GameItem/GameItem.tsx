import { Game } from "../../../../../../../types";
import classes from "./GameItem.module.scss";
import { forwardRef } from "react";
import Image from "next/image";

type Props = {
  gameItem: Game;
};

type WraperProps = {
  children: React.ReactNode;
};

type Ref = HTMLDivElement;

const GameItem = forwardRef<Ref, Props>(({ gameItem }, ref) => {
  console.log(gameItem);

  const Wraper = ({ children }: WraperProps) => {
    return (
      <>
        {ref && (
          <div className={classes.item} ref={ref}>
            {children}
          </div>
        )}
        {!ref && <div className={classes.item}>{children}</div>}
      </>
    );
  };

  return (
    <Wraper>
      <Image
        src={gameItem.background_image}
        alt="Game image"
        width={280}
        height={200}
        className={classes.image}
      />
      <div className={classes.desc}>
        <h2>{gameItem.name}</h2>
      </div>
    </Wraper>
  );
});

GameItem.displayName = "Game Item";

export default GameItem;
