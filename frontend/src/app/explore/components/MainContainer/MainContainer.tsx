import classes from "./MainContainer.module.scss";
import OptionContainer from "@/app/UI/OptionContainer/OptionContainer";
import OptionItem from "@/app/UI/OptionItem/OptionItem";
import { exploreOpitons } from "@/utils/consts";

const MainContainer = () => {
  return (
    <div className={classes["main-container"]}>
      <OptionContainer>
        {exploreOpitons.map((option) => {
          return (
            <OptionItem
              key={option.imagePath}
              desc={option.desc}
              imagePath={option.imagePath}
            />
          );
        })}
      </OptionContainer>
    </div>
  );
};

export default MainContainer;
