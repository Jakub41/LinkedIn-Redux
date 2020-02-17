import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";

import AuthMiddleware from "./Store/Middleware/AuthMiddleWare";

import { useDispatch, useSelector } from "react-redux";

// Components
import NavBar from "./Components/NavBar/NavBar";

// Pages
import Home from "./Pages/Profile";
import Feeds from "./Pages/Feeds";
import createProfilePage from "./Pages/createProfile";
import RegisterPage from "./Pages/Register";
import loginPage from "./Pages/Login";
import PrivateRoute from "./utils/privateRoute";
import ProtectedRoute from "./utils/protectedRoute";
import AdminDashbord from "./Pages/AdminDashbord";
import AdminRoute from "./utils/adminRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthMiddleware.Autoload());
  }, [dispatch]);

  return (
    <>
      <Router>
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/login" component={loginPage} />
            <ProtectedRoute
              path="/createProfile"
              component={createProfilePage}
            />
            <AdminRoute path="/dashboard" component={AdminDashbord} />

            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/pages/feeds" component={Feeds} />

            <Route exact path="/" component={RegisterPage} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
