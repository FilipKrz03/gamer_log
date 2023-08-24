import { Skeleton } from "@mui/material";
import classes from "./Skeletons.module.scss";

const skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8];

const Skeletons = () => {
  const skeletons = skeletonCount.map((skeleton) => {
    return (
      <div key={skeleton} className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          width={280}
          height={150}
          animation="pulse"
          className={classes.image}
        />
        <div className={classes.text}>
          <div className={classes.up}>
            <Skeleton variant="text" width={260} />
            <Skeleton variant="text" width={260} />
          </div>
          <div className={classes.bottom}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={30}
              animation="pulse"
              className={classes.genre}
            />
            <Skeleton
              variant="rectangular"
              width={50}
              height={30}
              animation="pulse"
            />
          </div>
        </div>
      </div>
    );
  });
  return skeletons;
};

export default Skeletons;
