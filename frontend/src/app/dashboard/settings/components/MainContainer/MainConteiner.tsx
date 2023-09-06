import classes from "./MainContainer.module.scss";
import Options from "../Options/Options";
const MainContainer = () => {
  return (
    <div className={classes["main-container"]}>
      <Options />
    </div>
  );
};

export default MainContainer;
