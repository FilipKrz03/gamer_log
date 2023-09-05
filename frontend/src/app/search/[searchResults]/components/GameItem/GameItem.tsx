import { Game } from "../../../../../../../types";
import classes from "./GameItem.module.scss";
import Link from "next/link";
import { forwardRef } from "react";
import Image from "next/image";
import pickColorBasedOnRating from "@/utils/functions/pickColorBasedOnRating";
import IconsSection from "@/app/UI/IconsSection/IconsSection";

type Props = {
  gameItem: Game;
};

type WraperProps = {
  children: React.ReactNode;
};

type Ref = HTMLDivElement;

const GameItem = forwardRef<Ref, Props>(({ gameItem }, ref) => {
  
  const ratingColor = pickColorBasedOnRating(gameItem.rating);

  const gameName =
    gameItem.name.length > 23
      ? gameItem.name.slice(0, 22) + "..."
      : gameItem.name;

  const gameGenre =
    gameItem.genres.length > 0
      ? gameItem.genres[0].name.length > 10
        ? gameItem.genres[0].name.slice(0, 9) + "..."
        : gameItem.genres[0].name
      : "Action";

  const Wraper = ({ children }: WraperProps) => {
    return (
      <>
        {ref && (
          <Link href={`/${gameItem.id}`}>
            <div className={classes.item} ref={ref}>
              {children}
            </div>
          </Link>
        )}
        {!ref && (
          <Link href={`/${gameItem.id}`}>
            <div className={classes.item}>{children}</div>{" "}
          </Link>
        )}
      </>
    );
  };

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
        <h2>{gameName}</h2>
        <IconsSection game={gameItem} />
        <div className={classes.basic}>
          <p className={classes.genre}>{gameGenre}</p>
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
