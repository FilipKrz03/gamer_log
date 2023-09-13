import { Metadata } from "next";
import UserWishes from "./components/UserWishes";

export const metadata: Metadata = {
  title: "My wishlist | GamerLog",
};

export default function MyWishlist() {
  return <UserWishes />;
}
