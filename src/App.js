import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import "./App.css";
import AuthMiddleware from "./Store/Middleware/AuthMiddleWare";
import PrivateRoute from "./utils/privateRoute";

// Components
import NavBar from "./Components/NavBar/NavBar";

// Pages
import RegisterPage from "./Pages/Register";
import loginPage from "./Pages/Login";
import Home from "./Pages/Profile";
import Feeds from "./Pages/Feeds";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthMiddleware.Autoload());
  }, [dispatch]);

  let { auth } = useSelector(state => state.AuthReducer);

  return (
    <>
      <NavBar />
      <Router basename="/">
        <Container>
          <Switch>
            <Route exact path="/login" component={loginPage} />
            <Route exact path="/" component={RegisterPage} />
            {/* Private routes */}
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/pages/feeds" component={Feeds} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
