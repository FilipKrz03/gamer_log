import axios from "@/utils/axios";
import { useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const request = await axios.get("/refresh", {
      withCredentials: true,
    });
    if (request.status === 200) {
      dispatch(userActions.setUser(request.data));
      console.log(request.data);
    }
  };
  return refresh;
};

export default useRefreshToken;
