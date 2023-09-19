import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  
  const refresh = async () => {
    try {
      const request = await axios.get("/refresh", {
        withCredentials: true,
      });
      dispatch(userActions.setUser(request.data));
      return request.data.accessToken;
    } catch (err) {
      dispatch(userActions.logoutUser());
    }
  };
  return refresh;
};

export default useRefreshToken;
