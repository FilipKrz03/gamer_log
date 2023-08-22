import { headers } from "next/headers";

export default async function SearchResults() {
  const headersList = headers().get("x-invoke-path");
  const searchTerm = headersList!.slice(8);

  return <div>Search params : {searchTerm}</div>;
}
