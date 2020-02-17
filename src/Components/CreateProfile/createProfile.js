import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import ProfileMiddleware from "../../Store/Middleware/ProfileMiddleware";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const CreateProfile = props => {
  const dispatch = useDispatch();

  let { auth } = useSelector(state => state.AuthReducer);

  const [createProfileData, setProfile] = useState({
    firstname: "",
    surname: "",
    title: "",
    area: "",
    email: "",
    bio: ""
  });

  useEffect(() => {
    if (auth && auth.user && auth.user.email) {
      setProfile({
        ...createProfileData,
        email: auth.user.email,
        username: auth.user.email,
        user: auth.user._id
      });
    }
  }, [auth]);

  const onChangeHandler = e => {
    const { value, name } = e.target;
    setProfile({
      ...createProfileData,
      [name]: value
    });
  };
  console.log(createProfileData);
  const SubmitProfile = e => {
    const {
      firstname,
      surname,
      title,
      area,
      email,
      bio,
      username,
      user
    } = createProfileData;
    if (firstname && surname && title && area && email && bio) {
      dispatch(
        ProfileMiddleware.postMyProfile({
          firstname,
          surname,
          title,
          area,
          email,
          bio,
          username,
          user
        })
      );
    } else {
      alert("Please fill all form");
    }
  };
  return (
    <div>
      {auth ? (
        auth.user ? (
          auth.user.profile ? (
            <Redirect to="/home" />
          ) : null
        ) : null
      ) : null}
      <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={onChangeHandler}
              required
              plaintext
              name="email"
              readOnly
              defaultValue={createProfileData.email}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            firstname
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="firstname"
              placeholder="firstname"
              onChange={onChangeHandler}
              value={createProfileData.firstname}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            surname
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              onChange={onChangeHandler}
              required
              name="surname"
              placeholder="surname"
              value={createProfileData.surname}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            job title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              onChange={onChangeHandler}
              required
              name="title"
              placeholder="job title"
              value={createProfileData.title}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Area of experty
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              onChange={onChangeHandler}
              required
              name="area"
              placeholder="area"
              value={createProfileData.area}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Bio
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              onChange={onChangeHandler}
              required
              name="bio"
              rows="3"
              value={createProfileData.bio}
            />
          </Col>
        </Form.Group>
        <Col sp="6" sm="6">
          <Button onClick={SubmitProfile}>Submit</Button>
        </Col>
      </Form>
    </div>
  );
};

export default CreateProfile;
