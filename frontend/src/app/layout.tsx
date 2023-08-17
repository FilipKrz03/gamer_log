import { Comfortaa} from "next/font/google";
import './globals.scss';

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  style: ["normal"],
  subsets:['latin']
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
      <body className={comfortaa.className}>{children}</body>
    </html>
  );
}
