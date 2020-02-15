import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./index.css";
import { emailPattern, passwordPattern } from "../../../utils/utils";
import RegisterMiddleware from "../../../Store/Middleware/AuthMiddleWare";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
const Login = props => {
  const dispatch = useDispatch();

  let AuthReducer = useSelector(state => state.AuthReducer);

  const [formData, setFormData] = useState({
    email: "",
    passwordIsValid: false,
    passwordHelp: "",
    passwordValidateStatus: "",

    password: "",
    emailIsValid: false,
    emailHelp: "",
    emailValidateStatus: "",

    remember: false,
    animationToggle: false,
    firstTime: 0
  });
  const onChangeValidator = (name, value) => {
    switch (name) {
      case "password":
      case "password":
        if (!passwordPattern.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
            passwordValidateStatus: "error",
            passwordHelp:
              "Must contain *8 digits, atleast 1 upper,lower case, digit and special charecters ",
            passwordIsValid: false
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            passwordValidateStatus: "success",
            passwordHelp: "",
            passwordIsValid: true
          });
        }
        break;
      case "email":
        if (!emailPattern.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
            emailValidateStatus: "error",
            emailHelp: "Enter a valid Email address!",
            emailIsValid: false
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            emailValidateStatus: "success",
            emailHelp: "",
            emailIsValid: true
          });
        }
        break;
      default:
        setFormData({
          ...formData
        });
    }
  };

  const handleChange = e => {
    if (e.target.name === "email" || e.target.name === "password") {
      onChangeValidator(e.target.name, e.target.value);
    }
  };

  const handleSubmit = e => {
    const { email, password, remember } = formData;
    console.log(formData.password);
    dispatch(RegisterMiddleware.getLogin({ email, password }));
  };

  return (
    <div className="loginPageItem">
      {AuthReducer.auth ? (
        AuthReducer.auth.user ? (
          AuthReducer.auth.user._id ? (
            <Redirect to="home" />
          ) : null
        ) : null
      ) : null}
      <div className="loginItem">
        <h1>Login Form</h1>
        <FormGroup className="login-itemform">
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Please enter you email"
          />
          <p className="errorShow">{formData.emailHelp}</p>
        </FormGroup>
        <FormGroup className="login-itemform">
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            onChange={handleChange}
            value={FormData.password}
            name="password"
            placeholder="password"
          />
          <p className="errorShow">{formData.passwordHelp}</p>
        </FormGroup>
        {AuthReducer.displaySpinner && (
          <Spinner animation="border" variant="primary" />
        )}
        {!AuthReducer.displaySpinner && (
          <Button
            disabled={!formData.passwordIsValid || !formData.emailIsValid}
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        )}
        <p className="EmailExit">
          {AuthReducer.errors
            ? AuthReducer.errors.message
              ? AuthReducer.errors.statusCode === 401
                ? AuthReducer.errors.message
                : "some thing is going wrong"
              : ""
            : ""}{" "}
        </p>
        <Link className="linkstyle" to="/">
          {" "}
          <p> I am not a member Please click on me</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
