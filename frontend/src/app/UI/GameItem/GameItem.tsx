"use client";
import { Game, GameFromDb } from "@/utils/types";
import classes from "./GameItem.module.scss";
import Link from "next/link";
import { forwardRef } from "react";
import Image from "next/image";
import pickColorBasedOnRating from "@/utils/functions/pickColorBasedOnRating";
import IconsSection from "@/app/UI/IconsSection/IconsSection";

type Props = {
  gameItem?: Game;
  dbGameItem?: GameFromDb;
};

type WraperProps = {
  children: React.ReactNode;
};

type Ref = HTMLDivElement;

const GameItem = forwardRef<Ref, Props>(({ gameItem, dbGameItem }, ref) => {
  const ratingColor = pickColorBasedOnRating(
    gameItem ? gameItem!.rating : dbGameItem!.rating
  );

  const link = gameItem ? gameItem.id : dbGameItem!.gameId;

  const Wraper = ({ children }: WraperProps) => {
    return (
      <>
        {ref && (
          <Link prefetch={true} href={`/game/${link}`} id="game">
            <div className={classes.item} ref={ref}>
              {children}
            </div>
          </Link>
        )}
        {!ref && (
          <Link prefetch={true} href={`/game/${link}`}>
            <div className={classes.item}>{children}</div>{" "}
          </Link>
        )}
      </>
    );
  };

  if (gameItem !== undefined) {
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
  } else if (dbGameItem !== undefined) {
    const gameName =
      dbGameItem.title.length > 23
        ? dbGameItem.title.slice(0, 22) + "..."
        : dbGameItem.title;

    return (
      <Wraper>
        <Image
          src={dbGameItem.image}
          alt="Game image"
          width={280}
          height={150}
          className={classes.image}
        />
        <div className={classes.desc}>
          <h2>{gameName}</h2>
          <IconsSection
            hasPc={dbGameItem.hasPc}
            hasPlayStation={dbGameItem.hasPlayStation}
            hasXbox={dbGameItem.hasXbox}
          />
          <div className={classes.basic}>
            <p className={classes.genre}>{dbGameItem.genre}</p>
            <div
              className={classes["rating-box"]}
              style={{ border: `1px solid ${ratingColor}` }}
            >
              <p className={classes.rating} style={{ color: ratingColor }}>
                {dbGameItem?.rating}
              </p>
            </div>
          </div>
        </div>
      </Wraper>
    );
  }
});

GameItem.displayName = "Game Item";

export default GameItem;
