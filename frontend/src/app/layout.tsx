import { Suspense } from "react";
import Header from "./components/Header/Header";
import MobileNav from "./components/MobileNav/MobileNav";
import PageContainer from "./UI/PageContainer/PageContainer";
import ProgressBarComponent from "./UI/ProgresBar/ProgresBar";
import { Comfortaa } from "next/font/google";
import "./globals.scss";
import ReduxProvider from "./UI/ReduxProvider/ReduxProvider";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import Notifications from "./UI/Notifications/Notifications";

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
          <PersistLogin>
            <Notifications>
              <Suspense>
                <ProgressBarComponent />
              </Suspense>
              <PageContainer>
                <Header />
                {children}
              </PageContainer>
              <MobileNav />
            </Notifications>
          </PersistLogin>
        </ReduxProvider>
      </body>
    </html>
  );
}
