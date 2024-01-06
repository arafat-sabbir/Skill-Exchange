import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const useAxios = () => {
  const { signOutUser } = useAuth();
  useEffect(() => {
    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          signOutUser()
            .then((res) => {
              <Navigate to={'/signIn'}></Navigate>
              console.log('sign out cause not token available');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    );
  }, [signOutUser]);
  return instance;
};

export default useAxios;
