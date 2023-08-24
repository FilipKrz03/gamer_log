import { Game } from "../../../../../../../types";
import classes from "./GameItem.module.scss";
import { forwardRef } from "react";
import Image from "next/image";
import pickColorBasedOnRating from "@/utils/functions/pickColorBasedOnRating";

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

  const ratingColor = pickColorBasedOnRating(gameItem.rating);

  return (
    <Wraper>
      {gameItem.background_image && (
        <Image
          src={gameItem.background_image}
          alt="Game image"
          width={280}
          height={150}
          className={classes.image}
        />
      )}
      {!gameItem.background_image && (
        <p className={classes["no-img"]}>Image not found</p>
      )}

      <div className={classes.desc}>
        <h2>{gameItem.name}</h2>
        <div className={classes.basic}>
          <p className={classes.genre}>
            {gameItem.genres.length > 0 ? gameItem.genres[0].name : "Action"}
          </p>
          <div
            className={classes["rating-box"]}
            style={{ border: `1px solid ${ratingColor}` }}
          >
            <p className={classes.rating} style={{ color: ratingColor }}>
              {gameItem.rating}
            </p>
          </div>
        </div>
      </div>
    </Wraper>
  );
});

GameItem.displayName = "Game Item";

export default GameItem;
