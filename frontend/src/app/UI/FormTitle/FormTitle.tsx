import classes from "./FormTitle.module.scss";

type Props = {
  desc: string;
  bolderDesc: string;
};

const FormTitle = ({ desc, bolderDesc }: Props) => {
  return (
    <div className={classes.title}>
      <h1 className={classes.bolder}>{bolderDesc}</h1>
      <p>{desc}</p>
    </div>
  );
};

export default FormTitle;
