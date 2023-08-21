import classes from "./SearchBox.module.scss";
import { Genre } from "../../../../../../types";
import { Platform } from "../../../../../../types";
import PlatformItem from "../PlatformItem/PlatformItem";
import GenreItem from "../GenreItem/GenreItem";
import Search from "@/app/UI/Search/Search";

type Props = {
  genres: Genre[];
  platforms: Platform[];
};

const SearchBox = ({ genres, platforms }: Props) => {
  return (
    <form className={classes.form}>
      <div className={classes["parametrs-box"]}>
        <div className={classes.left}>
          <p>Platforms</p>
          <div className={classes["box"]}>
            {platforms.map((platformItem) => {
              return (
                <PlatformItem key={platformItem.id} platform={platformItem} />
              );
            })}
          </div>
        </div>
        <div className={classes.right}>
          <p>Categories</p>
          <div className={classes["box"]}>
            {genres.map((genreItem) => {
              return <GenreItem key={genreItem.id} genre={genreItem} />;
            })}
          </div>
        </div>
      </div>
      <Search />
    </form>
  );
};

export default SearchBox;
