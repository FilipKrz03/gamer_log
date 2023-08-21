"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const ProgressBarComponent = () => {
  return (
    <ProgressBar
      height="4px"
      color="#ff9100"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBarComponent;
