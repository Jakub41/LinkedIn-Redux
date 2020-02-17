import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let { auth } = useSelector(state => state.AuthReducer);
  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          auth.user._id && auth.user.role !== "admin" && !auth.user.profile ? (
            <Component {...props} />
          ) : (
            <Redirect to="/dashboard" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
