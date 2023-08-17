import { navLinks } from "@/utils/consts";
import classes from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className={classes.header}>
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
      <nav>
        <ul>
          {navLinks.map((link) => {
            return (
              <li key={link.desc}>
                <Link href={link.link}>{link.desc}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
