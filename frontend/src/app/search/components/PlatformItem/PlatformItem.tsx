import classes from "./PlatformItem.module.scss";
import { Platform } from "../../../../../../types";

type Props = {
  platform: Platform;
};

const PlatformItem = ({ platform }: Props) => {
  return <div className={classes.platform}>{platform.name}</div>;
};

export default PlatformItem;
