"use client";
import classes from "./LoadingBody.module.scss";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

const LoadingBody = () => {
  return (
    <div className={classes.body}>
      <CircularProgress color="secondary" thickness={4.5} size={65} />
    </div>
  );
};

export default LoadingBody;
