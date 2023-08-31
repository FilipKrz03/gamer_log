import classes from "./FormContainer.module.scss";

type Props = {
  children: React.ReactNode;
};

const FormContainer = ({ children }: Props) => {
  return <div className={classes.container}>{children}</div>;
};

export default FormContainer;
