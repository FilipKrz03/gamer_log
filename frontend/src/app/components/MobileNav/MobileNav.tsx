"use client";
import {usePathname} from 'next/navigation';
import classes from './MobileNav.module.scss';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Link from "next/link";

const MobileNav = () => {

  const pathname = usePathname();

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link href={"/"} className={classes.active}>
            <HomeOutlinedIcon className={classes.icon} />
            {pathname === '/' &&  <p>Home</p>}
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <InfoOutlinedIcon className={classes.icon} />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <SearchIcon className={classes.icon} />
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <PersonOutlinedIcon className={classes.icon} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
