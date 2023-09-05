"use client";
import Image from "next/image";
import { Game } from "../../../../../../types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import classes from "./MainSection.module.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { Rating } from "@mui/material";
import IconsSection from "@/app/UI/IconsSection/IconsSection";
import pickColorBasedOnRating from "@/utils/functions/pickColorBasedOnRating";
import axios from "@/utils/axios";

type Props = {
  gameItem: Game;
};

const MainSection = ({ gameItem }: Props) => {
  const userId = useSelector((state: RootState) => state.users.userId);

  const ratingColor = pickColorBasedOnRating(gameItem.rating);
  const genres = gameItem.genres.slice(0, 3);

  const addToMyGamesHandler = async () => {
    try {
      const request = await axios.post("/newgame", {
        gameId: gameItem.id,
        userId,
      });
      console.log(request);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes["main-info"]}>
      <Image
        className={classes.image}
        src={gameItem.background_image}
        alt="Game image"
        width={0}
        height={0}
        sizes="50vw"
        style={{
          aspectRatio: 2 / 1,
          width: "50vw",
          height: "auto",
          margin: "0 auto",
        }}
      />
      <div className={classes["text-info"]}>
        <div className={classes["actions-row"]}>
          <div className={classes.content}>
            <div className={classes.text} onClick={addToMyGamesHandler}>
              <span> Add to </span>
              <span className={classes.list}>My Games</span>
            </div>
            <AddOutlinedIcon className={classes.icon} />
          </div>
          <div className={classes.content}>
            <div className={classes.text}>
              <span> Add to </span>
              <span className={classes.list}>Wishlist</span>
            </div>
            <CardGiftcardOutlinedIcon className={classes.icon} />
          </div>
        </div>
        <div className={classes["first-row"]}>
          <div className={classes.released}>{gameItem.released}</div>
          <div className={classes.icons}>
            <IconsSection game={gameItem} />
          </div>
          <p className={classes.average}>
            <span className={classes.title}> Average Playtime: </span>
            {gameItem.playtime} hours
          </p>
        </div>
        <h1>{gameItem.name}</h1>
        <div className={classes["genres-row"]}>
          {genres.map((genre) => {
            return (
              <div className={classes["genre-item"]} key={genre.name}>
                {genre.name}
              </div>
            );
          })}
        </div>
        <div className={classes["rating-row"]}>
          <p className={classes.count}>
            <span>Rating Count : </span>
            <span className={classes.number}> {gameItem.ratings_count} </span>
          </p>
          <div
            className={classes["rating-box"]}
            style={{ border: `1px solid ${ratingColor}` }}
          >
            <Rating
              size="large"
              value={gameItem.rating}
              readOnly
              precision={0.5}
              style={{ color: ratingColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
