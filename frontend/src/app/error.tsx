"use client";
import NotFoundComponent from "./UI/NotFoundComponent/NotFoundComponent";
import Button from "./UI/Button/Button";

export default function Error(error: Error) {
  return (
    <>
      <NotFoundComponent message={error.message || "We faced some problems"} />
      <div style={{ textAlign: "center" }}>
        <Button desc="Back to previous page" isError={true} />
      </div>
    </>
  );
}
