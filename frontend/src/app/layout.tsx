import { Suspense } from "react";
import Header from "./components/Header/Header";
import MobileNav from "./components/MobileNav/MobileNav";
import PageContainer from "./UI/PageContainer/PageContainer";
import ProgressBarComponent from "./UI/ProgresBar/ProgresBar";
import { Comfortaa } from "next/font/google";
import "./globals.scss";
import ReduxProvider from "./UI/ReduxProvider/ReduxProvider";

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
        <ReduxProvider>
          <Suspense>
            <ProgressBarComponent />
          </Suspense>
          <PageContainer>
            <Header />
            {children}
          </PageContainer>
          <MobileNav />
        </ReduxProvider>
      </body>
    </html>
  );
}
