import MobileNav from "./components/MobileNav/MobileNav";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Informations from "./components/Informations/Informations";
import classes from "./page.module.scss";

export default function Home() {
  return (
    <>
      <div style={{ width: "82vw", margin: "0 auto" }}>
        <Header />
        <Hero />
      </div>
      <MobileNav />
    </>
  );
}
