import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import { Context } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loader} = useContext(Context)
    const location = useLocation()

    if(loader){
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-warning loading-lg"></span></div> 
    }
    if(user){
        return children;
    }
    return <Navigate state={location.pathname} to={'/signIn'}></Navigate>
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children:PropTypes.node
}