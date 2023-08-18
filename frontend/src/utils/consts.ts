import VpnLockIcon from "@mui/icons-material/VpnLock";
import StorageIcon from "@mui/icons-material/Storage";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";

export const navLinks: { desc: string; link: string }[] = [
  { desc: "About", link: "/about" },
  { desc: "Search", link: "/search" },
  { desc: "Log in", link: "/login" },
];

export const informations: { icon: any; title: string; desc: string }[] = [
  {
    icon: StorageIcon,
    title: "Modern Web",
    desc: "This websites uses modern technologies , what providers to the best possible user expirience and functionality ",
  },
  {
    icon: MoneyOffCsredIcon,
    title: "Completly Free",
    desc: "This application is completly free ! You can browse your favourite games without worry of any payments",
  },
  {
    icon: VpnLockIcon,
    title: "Safety First",
    desc: "Our product uses very safe authenctiaction methods. You can be sure that your data is completly safe",
  },
];
