import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Card,
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import ProfileMiddleware from "../Store/Middleware/ProfileMiddleware";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { USERNAME } from "../Services/constAPI";

const Home = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector(state => ({
    profiles: state.ProfileReducer.profiles
  }));

  console.log("Do we have it???? ", profiles);

  useEffect(() => {
    dispatch(ProfileMiddleware.getOneProfile(USERNAME));
  }, [dispatch]);

  console.log("Profiles Data", profiles);

  return (
    <>
      {profiles.data &&
        [profiles.data].map((p, k) => <h1>${p.firstname}</h1>)}
    </>
  );
};

export default Home;
