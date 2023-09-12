import { Preferences } from "../../../../../../../types";
import PreferenceItem from "../PreferenceItem/PreferenceItem";
import classes from "./PickPreference.module.scss";

type Props = {
  preferenceTitle: string;
  preferenceItems: Preferences[];
};

const PickPreference = ({ preferenceTitle, preferenceItems }: Props) => {
  return (
    <div className={classes.container}>
      <h2>{preferenceTitle}</h2>
      <div className={classes["preference-box"]}>
        {preferenceItems.map((preference) => {
          return (
            <PreferenceItem
              key={preference.id}
              id={preference.id}
              title={preference.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PickPreference;
