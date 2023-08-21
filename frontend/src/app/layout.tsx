import { Comfortaa } from "next/font/google";
import "./globals.scss";
import Header from "./components/Header/Header";
import MobileNav from "./components/MobileNav/MobileNav";
import PageContainer from "./UI/PageContainer/PageContainer";
import ProgressBarComponent from "./UI/ProgresBar/ProgresBar";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Gamer Log",
  description: "Website for gamers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <ProgressBarComponent />
        <PageContainer>
          <Header />
          {children}
        </PageContainer>
        <MobileNav />
      </body>
    </html>
  );
}
