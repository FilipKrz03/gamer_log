"use client";
import { navMobileLinks } from "@/utils/consts";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classes from "./MobileNav.module.scss";

const MobileNav = () => {
  const pathname = usePathname();

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
                {pathname === link.link && <p>{link.desc}</p>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MobileNav;
