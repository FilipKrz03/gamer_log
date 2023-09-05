import { axiosPrivate } from "@/utils/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const useAxiosPrivate = () => {
  const accesToken = useSelector((state: RootState) => state.users.accessToken);
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accesToken}`;
        }
        return config;
      },
      (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => response,
      async (error: any) => {
        const prevRequest = error.config;
        if (error?.response?.status === 403 && !prevRequest?.sent!) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  } , [refresh , accesToken]);
  return axiosPrivate;
};

export default useAxiosPrivate;
