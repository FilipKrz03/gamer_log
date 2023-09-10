"use client";
import SearchResults from "@/app/UI/SearchResults/SearchResults";

const UserWishes = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0px" }}>Your Wishlist</h1>
      <SearchResults isUserData={true} dataPath="mywishes" />
    </>
  );
};

export default UserWishes;
