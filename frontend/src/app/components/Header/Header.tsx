"use client";
import { navLinks } from "@/utils/consts";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import classes from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { RootState } from "@/store";

const Header = () => {
  const pathname = usePathname();
  const isLogged = useSelector((state: RootState) => state.users.isLogged);

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
                  className={pathname === link.link ? classes.active : ""}
                >
                  {link.desc}
                </Link>
              </li>
            );
          })}
          {!isLogged && (
            <li>
              <Link
                className={
                  pathname === "/login" || pathname === "/register"
                    ? classes.active
                    : ""
                }
                href={"/login"}
              >
                Log In
              </Link>
            </li>
          )}
          {isLogged && (
            <li>
              <Link
                className={pathname.includes("dashboard") ? classes.active : ""}
                href={"/dashboard"}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
