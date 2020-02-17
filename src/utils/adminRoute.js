import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  let { auth } = useSelector(state => state.AuthReducer);

  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          auth.user.role === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
