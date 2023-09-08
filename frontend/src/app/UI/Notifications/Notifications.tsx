"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import StatusNotification from "../StatusNotification/StatusNotification";

type Props = {
  children: React.ReactNode;
};

const Notifications = ({ children }: Props) => {
  const statuses = useSelector((state: RootState) => state.status);

  return (
    <>
      {children}
      {statuses.isError && (
        <StatusNotification
          isProper={false}
          description={statuses.errorMessage}
        />
      )}
      {statuses.isSucces && (
        <StatusNotification
          isProper={true}
          description={statuses.succesMessage}
        />
      )}
    </>
  );
};

export default Notifications;
