"use client";
import Search from "@/app/UI/Search/Search";
import classes from "./Hero.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Hero = () => {
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const getInputValue = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const submitFormHandler = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const path = inputValue !== "" ? "&search=" + inputValue : "&all";
    router.push(`/search/${path}`);
  };

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
        <form onSubmit={submitFormHandler}>
          <Search onFormSubmit={getInputValue} />
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
