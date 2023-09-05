import classes from "./StatusNotification.module.scss";
import { motion } from "framer-motion";

type Props = {
  description: string;
  isProper: boolean;
};

const StatusNotification = ({ description, isProper }: Props) => {
  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{duration:0.2}}
      className={`${classes.notification} ${
        isProper ? classes.proper : classes.error
      }`}
    >
      <p>{description}</p>
      <div className={classes.bar} />
    </motion.div>
  );
};

export default StatusNotification;
