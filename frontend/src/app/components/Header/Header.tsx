"use client";
import { navLinks } from "@/utils/consts";
import { usePathname } from "next/navigation";
import classes from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={classes.header}>
      <Link href={"/"}>
        <div className={classes.logo}>
          <Image
            src={"/images/logo.png"}
            alt="Website logo"
            width={45}
            height={45}
          />
          <p>
            Gamer<span className={classes.log}>Log</span>
          </p>
        </div>
      </Link>
      <nav>
        <ul>
          {navLinks.map((link) => {
            return (
              <li key={link.desc}>
                <Link
                  href={link.link}
                  className={
                    pathname === link.link ||
                    (pathname === "/register" && link.desc === "Log in")
                      ? classes.active
                      : ""
                  }
                >
                  {link.desc}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
