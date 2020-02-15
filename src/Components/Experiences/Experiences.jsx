import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ExperiencesMiddleware } from "../../Store/Middleware";
import { USERNAME } from "../../Services/constAPI";
import moment from "moment";

const Experiences = () => {
  const dispatch = useDispatch();
  const { experiences } = useSelector(state => ({
    experiences: state.ExperiencesReducer.experiences
  }));

  console.log("My Exp", experiences.profileExperiences);

  useEffect(() => {
    dispatch(ExperiencesMiddleware.getAllExperiencesProfile(USERNAME));
  }, [dispatch]);

  return !experiences.object ? (
    <>
      <Container>
        <h1>Experience</h1>
        {experiences.profileExperiences &&
          experiences.profileExperiences
            .map(P => P.experience)
            .flat()
            .map((E, k) => (
              <Row key={k}>
                <Col md={12}>
                  <Card style={{ width: "100%" }} className="mb-3">
                    <Row className="no-gutters">
                      <Col md={4}>
                        <Image src={E.image} alt="exp img" />
                      </Col>
                      <Col md={8}>
                        <Card.Body>
                          <Card.Title>{E.role}</Card.Title>
                          <Card.Text>{E.company}</Card.Text>
                          <Card.Text>{E.area}</Card.Text>
                          <Card.Text>{moment(E.startDate).format("MMMM DD, YYYY")}</Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            ))}
      </Container>
    </>
  ) : (
    <h3 className="red-text mt-5">No experiences to show</h3>
  );
};

export default Experiences;
