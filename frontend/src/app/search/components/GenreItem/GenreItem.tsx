import { Genre } from "../../../../../../types";
import classes from "./GenreItem.module.scss";

type Props = {
  genre: Genre;
};

const GenreItem = ({ genre }: Props) => {
  return <div className={classes.genre}>{genre.name}</div>;
};

export default GenreItem;
