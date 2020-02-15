import React, { useEffect, useState } from "react";
import { Row, Col, Jumbotron, Container, Image } from "react-bootstrap";
import { ProfileMiddleware } from "../Store/Middleware";
import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { USERNAME } from "../Services/constAPI";
import Experiences from "../Components/Experiences/Experiences";
import { Spinner } from "../Components/Spinner/Spinner.js";

const Home = () => {
  const dispatch = useDispatch();
  let [isLoader, setLoader] = useState(true);
  const { profiles, displaySpinner } = useSelector(state => ({
    profiles: state.ProfileReducer.profiles,
    displaySpinner: state.ProfileReducer.displaySpinner
  }));

  useEffect(() => {
    setLoader(displaySpinner);
  }, [displaySpinner]);

  useEffect(() => {
    dispatch(ProfileMiddleware.getOneProfile(USERNAME));
  }, [dispatch]);

  return Object.keys(profiles).length !== 0 ? (
    <>
      <Jumbotron>
        <Container>
          <Row>
            <Col md={6}>
              <Image src={profiles.imageUrl} alt="profile" roundedCircle />
            </Col>
            <Col md={6}>
              <h1>{profiles.firstname + " " + profiles.surname}</h1>
              <h4>{profiles.title}</h4>
              <h5>{profiles.area}</h5>
              <p>{profiles.email}</p>
              <p>{profiles.bio}</p>
            </Col>
          </Row>
          <Spinner displaySpinner={isLoader} />
        </Container>
      </Jumbotron>
      <Experiences />
    </>
  ) : (
    <h3 className="red-text mt-5">The profile is not available</h3>
  );
};

Home.propTypes = {
  profiles: PropTypes.object.isRequired
};

export default Home;
