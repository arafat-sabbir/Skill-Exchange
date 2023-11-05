import { useContext } from "react";
import { Context } from "../Components/AuthProvider/AuthProvider";

const useAuth = () => {
    const auth = useContext(Context)
    return auth;
};

export default useAuth;