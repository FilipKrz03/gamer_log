"use client";
import LoadingBody from "@/app/UI/LoadingBody/LoadingBody";
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

  return <>{isLoading ? <LoadingBody /> : children}</>;
};

export default PersistLogin;
