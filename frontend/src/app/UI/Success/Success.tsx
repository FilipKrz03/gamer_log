import classes from "./Succes.module.scss";
import Alert from "@mui/material/Alert/Alert";
import Link from "next/link";

type Props = {
  message: string;
  link?: string;
  linkDesc?: string;
};

const Success = ({ message, link, linkDesc }: Props) => {
  return (
    <Alert variant="filled" severity="success" className={classes.alert}>
      {message + " "}
      {link && <Link href={link}>{linkDesc!}</Link>}
    </Alert>
  );
};

export default Success;
