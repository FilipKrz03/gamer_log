"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";

type Props = {
  children: React.ReactNode;
};

const AuthChecker = ({ children }: Props) => {
  const isLogged = useSelector((state: RootState) => state.users.isLogged);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) router.push("/");
  }, [isLogged, router]);

  return <>{children}</>;
};

export default AuthChecker;
