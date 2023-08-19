import VpnLockIcon from "@mui/icons-material/VpnLock";
import StorageIcon from "@mui/icons-material/Storage";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MobileFriendlyOutlinedIcon from '@mui/icons-material/MobileFriendlyOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';

export const navLinks: { desc: string; link: string }[] = [
  { desc: "About", link: "/about" },
  { desc: "Search", link: "/search" },
  { desc: "Log in", link: "/login" },
];
export const navMobileLinks: { icon: any; desc: string; link: string }[] = [
  { icon: HomeOutlinedIcon, desc: "Home", link: "/" },
  { icon: InfoOutlinedIcon, desc: "About", link: "/about" },
  { icon: SearchIcon, desc: "Search", link: "/search" },
  { icon: PersonOutlinedIcon, desc: "Log in", link: "/login" },
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
  {
    icon: MobileFriendlyOutlinedIcon,
    title: "All devcies",
    desc: "This application works perfect on any kind of device . It is no matter if you use laptop , smartphon or tablet",
  },
  {
    icon: ApiOutlinedIcon,
    title: "Data",
    desc: "Our product has acces to almost all games . We are using the biggest game database in the market ",
  },
];
