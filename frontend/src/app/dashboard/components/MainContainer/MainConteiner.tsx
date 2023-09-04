"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import classes from "./MainContainer.module.scss";
import OptionContainer from "@/app/UI/OptionContainer/OptionContainer";
import OptionItem from "@/app/UI/OptionItem/OptionItem";
import { dashboardOpitons } from "@/utils/consts";

const MainContainer = () => {
  const username = useSelector((state: RootState) => state.users.username);

  return (
    <div className={classes["main-container"]}>
      <p>
        <span className={classes.hello}>Welcome</span>, {username} !
      </p>
      <OptionContainer>
        {dashboardOpitons.map((option) => {
          return (
            <OptionItem
              link={option.link}
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
