import classes from "./MainContainer.module.scss";
import Options from "../Options/Options";
import UserInfo from "../UserInfo/UserInfo";
const MainContainer = () => {
  return (
    <div className={classes["main-container"]}>
      <Options />
      <UserInfo />
    </div>
  );
};

export default MainContainer;
