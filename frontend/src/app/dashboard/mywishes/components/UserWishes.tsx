"use client";
import SearchResults from "@/app/search/[searchResults]/components/SearchResults/SearchResults";

const UserWishes = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0px" }}>Your Wishlist</h1>
      <SearchResults isUserData={true} dataPath="mywishes" />
    </>
  );
};

export default UserWishes;
