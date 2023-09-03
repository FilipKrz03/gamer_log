"use client";
import classes from "./Alert.module.scss";
import ErrorIcon from "@mui/icons-material/Error";

type Props = {
  message: string;
  isBig?: boolean;
};

const Alert = ({ message, isBig }: Props) => {
  return (
    <div className={classes.alert}>
      <ErrorIcon
        fontSize={isBig ? "large" : "small"}
        className={`${classes.icon} ${isBig ? classes.big : ""}`}
      />
      {message}
    </div>
  );
};

export default Alert;
