"use client";
import SearchResults from "@/app/search/[searchResults]/components/SearchResults/SearchResults";

const UserGames = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0px" }}>Your game list</h1>
      <SearchResults isUserData={true} dataPath="mygames" />
    </>
  );
};

export default UserGames;
