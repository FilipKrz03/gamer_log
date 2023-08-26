import Carousel from "nuka-carousel";
import Image from "next/image";
import { Screenshots } from "../../../../../../types";
import classes from "./ScreensCaraousel.module.scss";

type Props = {
  screenshots: Screenshots;
};

const ScreensCaraousel = ({ screenshots }: Props) => {
  const images = screenshots.map((scrren) => {
    return { original: scrren.image };
  });

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Game screenshots : </h2>
      <Carousel style={{ width: "70vw" }} className={classes.caraousel}>
        {screenshots.map((screen) => {
          return (
            <Image
              className={classes.image}
              loading="eager"
              key={screen.image}
              alt="Game screen image"
              src={screen.image}
              width={0}
              height={0}
              sizes="70vw"
              style={{
                aspectRatio: 2 / 1.15,
                width: "70vw",
                height: "auto",
                margin: "0 auto",
              }}
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default ScreensCaraousel;