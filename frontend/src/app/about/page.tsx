import { Metadata } from "next";
import AboutSection from "./components/AboutSection/AboutSection";
import CountupSection from "./components/CountupSection/CountupSection";
import StatisticSection from "./components/StatisticSection/StatisticSection";

export const metadata: Metadata = {
  title: "About | GamerLog",
};

export default function About() {
  return (
    <>
      <AboutSection />
      <CountupSection />
      <StatisticSection />
    </>
  );
}
