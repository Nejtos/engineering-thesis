import { useState, useEffect } from "react";
import { UserContext} from "./UserContext.jsx";
import axios from "axios";
import Cookies from "js-cookie";


export const UserContextProvider = (props) => {

  const [userState, setUserState] = useState({
    id: "",
    name: "",
    email: "",
    userAvatar: "",
    phoneNum: "",
    cardNum: "",
    cardExpirationDate: "",
    status: false,
  });

  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = Cookies.get("token");

      // config.headers["token", "userID"] = [token, userID];
      config.headers["token"] = token;

      // config.headers["token"] = token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const id = Cookies.get("userID");

  useEffect(() => {
    axiosInstance
      .get("http://localhost:8000/users/auth", {
        headers: {
          userID: Cookies.get("userID"),
          token: Cookies.get("token"),
          // userID: config.headers.userID,
          // token: Cookies.get('token'),
          // userID: Cookies.get('userID'),
        },
      })
      .then((response) => {
        if (response.data) {
          setUserState({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            userAvatar: response.data.userAvatar,
            phoneNum: response.data.phoneNum,
            cardNum: response.data.cardNum,
            cardExpirationDate: response.data.cardExpirationDate,
            status: true,
          });
        }
      });
  }, [id])

  const contextValue = {
    userState, setUserState
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};