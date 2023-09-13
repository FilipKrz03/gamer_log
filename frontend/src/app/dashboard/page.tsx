import { Metadata } from "next";
import MainContainer from "./components/MainContainer/MainConteiner";

export const metadata: Metadata = {
  title: "Dashboard | GamerLog",
};

export default function Dashboard() {
  return <MainContainer />;
}
