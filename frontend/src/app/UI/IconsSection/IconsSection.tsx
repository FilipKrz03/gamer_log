import Image from "next/image";
import { Game } from "../../../../../types";
import classes from "./IconsSection.module.scss";
import checkPlaforms from "@/utils/functions/checkPlatforms";

type Props = {
  game?: Partial<Game>;
  hasPc?: boolean;
  hasXbox?: boolean;
  hasPlayStation?: boolean;
};

const IconsSection = ({ game, hasPc, hasPlayStation, hasXbox }: Props) => {

  const {
    hasPc: isPc,
    hasXbox: isXbox,
    hasPlayStation: isPlayStation,
  } = checkPlaforms(game?.platforms!);

  return (
    <div className={classes.icons}>
      {(hasPc || isPc) && (
        <Image
          alt="PC"
          src={"/images/windows.png"}
          width={30}
          height={30}
          style={{ marginRight: "-5px" }}
        />
      )}
      {(hasXbox ||
        isXbox) && (
          <Image alt="Xbox" src={"/images/xbox.png"} width={20} height={20} />
        )}
      {(hasPlayStation ||
        isPlayStation) && (
          <Image
            alt="PlayStation"
            src={"/images/playstation.png"}
            width={20}
            height={20}
          />
        )}
    </div>
  );
};

export default IconsSection;
