"use client";
import LoadingPage from "@/app/UI/LoadingPage/LoadingPage";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const PersistLogin = ({ children }: Props) => {
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const persistLogin = async () => {
      try {
        await refresh();
      } catch (err) {
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    persistLogin();
    return () => {
      isMounted = false;
    };
  }, [refresh]);

  return <>{isLoading ? <LoadingPage /> : children}</>;
};

export default PersistLogin;
