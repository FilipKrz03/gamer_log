"use client";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { navMobileLinks } from "@/utils/consts";
import Link from "next/link";
import classes from "./MobileNav.module.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { RootState } from "@/store";

const MobileNav = () => {
  const pathname = usePathname();
  const isLogged = useSelector((state: RootState) => state.users.isLogged);

  return (
    <nav className={classes.nav}>
      <ul>
        {navMobileLinks.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.desc}>
              <Link
                href={link.link}
                className={pathname === link.link ? classes.active : ""}
              >
                <Icon className={classes.icon} />
                {pathname === link.link ? <p>{link.desc}</p> : ""}
              </Link>
            </li>
          );
        })}
        {!isLogged && (
          <li>
            <Link
              href={"/login"}
              className={pathname === "/login" ? classes.active : ""}
            >
              <PersonOutlinedIcon className={classes.icon} />
              {pathname === "/login" ? <p>Log In</p> : ""}
            </Link>
          </li>
        )}
        {isLogged && (
          <li>
            <Link
              href={"/dashboard"}
              className={pathname.includes("dashboard") ? classes.active : ""}
            >
              <GridViewOutlinedIcon className={classes.icon} />
              {pathname.includes("dashboard") ? <p>Dashboard</p> : ""}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
