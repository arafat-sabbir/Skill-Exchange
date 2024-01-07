import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../AuthProvider/AuthProvider";
import UseLoading from "../../Hook/useLoading";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(Context);
  const location = useLocation();

  if (loader) {
    return (
     <UseLoading></UseLoading>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/signIn"}></Navigate>;
};

export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
