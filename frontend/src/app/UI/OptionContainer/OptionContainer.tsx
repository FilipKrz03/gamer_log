import classes from "./OptionContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const OptionContainer = ({ children }: Props) => {
  return <div className={classes.container}>{children}</div>;
};

export default OptionContainer;
