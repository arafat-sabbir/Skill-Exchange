import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import { Context } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loader} = useContext(Context)
    const location = useLocation()

    if(loader){
        return <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
          <div className="flex justify-center">
            <div className="animate-spin inline-block w-10 h-10 font-bold  border-[3px] border-current border-t-transparent text-main rounded-full dark:text-main" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
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