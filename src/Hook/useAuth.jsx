import { useContext } from "react";
import { Context } from "../Components/AuthProvider/AuthProvider";

const useAuth = () => {
    const auth = useContext(Context)
    console.log(auth);
    return auth;
};

export default useAuth;