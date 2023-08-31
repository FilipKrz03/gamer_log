"use client";
import classes from "./Alert.module.scss";
import ErrorIcon from "@mui/icons-material/Error";

type Props = {
  message: string;
};

const Alert = ({ message }: Props) => {
  return (
    <div className={classes.alert}>
      <ErrorIcon fontSize="small" className={classes.icon} />
      {message}
    </div>
  );
};

export default Alert;
