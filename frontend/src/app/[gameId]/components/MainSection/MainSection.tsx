"use client";
import Image from "next/image";
import { Game } from "../../../../../../types";
import { useState, useEffect } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import classes from "./MainSection.module.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import { Rating } from "@mui/material";
import IconsSection from "@/app/UI/IconsSection/IconsSection";
import pickColorBasedOnRating from "@/utils/functions/pickColorBasedOnRating";
import { setSuccesMessage, setErrorMessage } from "@/store/statusSlice";
import { isAxiosError, AxiosError } from "axios";

type Props = {
  gameItem: Game;
};

const MainSection = ({ gameItem }: Props) => {
  const [isGameAdded, setIsGameAdded] = useState(false);
  const [isGameInWishes, setIsGameInWishes] = useState(false);

  const isLogged = useSelector((state: RootState) => state.users.isLogged);
  const dispatch = useDispatch();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!isLogged) return;
    async function checkStatus() {
      try {
        const isGameInLists = await axiosPrivate.post("/check", {
          gameId: gameItem.id,
        });
        setIsGameAdded(isGameInLists.data.isOnTheGameList);
        setIsGameInWishes(isGameInLists.data.isOnTheWishList);
      } catch (err) {
        setIsGameInWishes(false);
        setIsGameAdded(false);
      }
    }
    checkStatus();
  }, [axiosPrivate, gameItem.id, isLogged]);

  const ratingColor = pickColorBasedOnRating(gameItem.rating);
  const genres = gameItem.genres.slice(0, 3);

  const addToListHandler = async (path: string, listName: string) => {
    if (!isLogged)
      return dispatch(setErrorMessage("You need to be logged !") as any);
    try {
      const request = await axiosPrivate.post(path, {
        gameId: gameItem.id,
      });
      dispatch(setSuccesMessage(`Game added to your ${listName} !`) as any);
      listName === "games" ? setIsGameAdded(true) : setIsGameInWishes(true);
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        dispatch(
          setErrorMessage(err.response?.data.message || err.message) as any
        );
      } else {
        dispatch(setErrorMessage("Something went wrong ") as any);
      }
    }
  };

  const removeFromListHandler = async (path: string, listName: string) => {
    if (!isLogged)
      return dispatch(setErrorMessage("You need to be logged !") as any);
    try {
      const delateGame = await axiosPrivate.delete(path, {
        data: {
          gameId: gameItem.id,
        },
      });
      dispatch(setSuccesMessage(`Game delated from your ${listName} !`) as any);
      listName === "games" ? setIsGameAdded(false) : setIsGameInWishes(false);
    } catch (err) {
      if (isAxiosError(err)) {
        dispatch(
          setErrorMessage(err.response?.data.message || err.message) as any
        );
      } else {
        dispatch(setErrorMessage("Something went wrong ") as any);
      }
    }
  };

  return (
    <>
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
            <div
              className={`${classes.content} ${
                isGameAdded ? classes.added : ""
              }`}
              onClick={
                !isGameAdded
                  ? addToListHandler.bind(null, "/newgame", "games")
                  : removeFromListHandler.bind(null, "/game", "games")
              }
            >
              <div className={classes.text}>
                <span> {isGameAdded ? "Remove From" : "Add to"}</span>
                <span className={classes.list}>My Games</span>
              </div>
              <AddOutlinedIcon className={classes.icon} />
            </div>
            <div
              className={`${classes.content} ${
                isGameInWishes ? classes.added : ""
              }`}
              onClick={
                !isGameInWishes
                  ? addToListHandler.bind(null, "/newwish", "wishes")
                  : removeFromListHandler.bind(null, "/wish", "wishes")
              }
            >
              <div className={classes.text}>
                <span> {isGameInWishes ? "Remove From" : "Add to"}</span>
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
    </>
  );
};

export default MainSection;
