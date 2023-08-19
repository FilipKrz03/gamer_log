"use client";
import classes from "./InfoItem.module.scss";

type Props = {
  information: {
    icon: any;
    title: string;
    desc: string;
  };
};

const InfoItem = ({ information }: Props) => {
  const Icon = information.icon;
  return (
    <div className={classes.information}>
      <Icon fontSize='large' className={classes.icon} />
      <p>{information.desc}</p>
    </div>
  );
};

export default InfoItem;
