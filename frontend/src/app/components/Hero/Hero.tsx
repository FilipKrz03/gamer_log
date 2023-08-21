import Search from "@/app/UI/Search/Search";
import classes from "./Hero.module.scss";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.text}>
        <h2>
          We help to
          <span className={classes.search}> search and explore </span>
          games community
        </h2>
        <p>
          Search,brows and judge video games. Create your profile and find out
          all avaliable features
        </p>
        <form>
          <Search />
        </form>
      </div>
      <Image
        src={"/images/hero-image.svg"}
        alt="Controller and peaople"
        width={555}
        height={375}
        className={classes.image}
      />
    </section>
  );
};

export default Hero;
