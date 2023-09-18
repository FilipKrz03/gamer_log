"use client";
import useWindowWidth from "@/hooks/useWindowWidth";
import { Game } from "@/utils/types";
import classes from "./AsideDetails.module.scss";

type Props = {
  gameItem: Partial<Game>;
};

const AsideDetails = ({ gameItem }: Props) => {
  const windowWidth = useWindowWidth();

  const slicedWebsiteLink = gameItem.website?.slice(0, 22) + "...";
  const slicedRedditLink = gameItem.reddit_url?.slice(0, 22) + "...";
  const tagsArr = gameItem.tags?.slice(0, 8);

  return (
    <aside className={classes.aside}>
      Other informations :
      <div className={classes["aside-short-box"]}>
        {gameItem.developers!.length > 0 && (
          <div className={classes["aside-item"]}>
            <span>Producent:</span>
            <span className={classes.developer}>
              {gameItem.developers![0].name}
            </span>
          </div>
        )}
        {gameItem.website && (
          <div className={classes["aside-item"]}>
            <span>Website:</span>
            <a href={gameItem.website} target="_blank">
              {windowWidth < 600 ? slicedWebsiteLink : gameItem.website}
            </a>
          </div>
        )}
        {gameItem.reddit_url && (
          <div className={classes["aside-item"]}>
            <span> Reddit Url: </span>
            <a href={gameItem.reddit_url} target="_blank">
              {windowWidth < 600 ? slicedRedditLink : gameItem.reddit_url}
            </a>
          </div>
        )}
      </div>
      {gameItem.tags!.length > 0 && (
        <div className={classes.tags}>
          {gameItem.tags?.map((tag) => {
            return (
              <div key={tag.name} className={classes.tag}>
                {tag.name}
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default AsideDetails;
