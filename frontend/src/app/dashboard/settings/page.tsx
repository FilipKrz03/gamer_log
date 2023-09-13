import { Metadata } from "next";
import MainContainer from "../settings/components/MainContainer/MainConteiner";

export const metadata: Metadata = {
  title: "Settings | GamerLog",
};

export default function Settings() {
  return <MainContainer />;
}
