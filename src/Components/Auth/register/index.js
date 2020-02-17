import React, { useState } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./index.css";
import RegisterMiddleware from "../../../Store/Middleware/AuthMiddleWare";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { emailPattern, passwordPattern } from "../../../utils/utils";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const Register = props => {
  const dispatch = useDispatch();

  let AuthReducer = useSelector(state => state.AuthReducer);

  const [formData, setFormData] = useState({
    password: "",
    passwordIsValid: false,
    passwordHelp: "",
    passwordValidateStatus: "",

    email: "",
    emailIsValid: false,
    emailHelp: "",
    emailValidateStatus: "",

    confirmPassword: "",
    confirmPasswordIsValid: false,
    confirmPasswordHelp: "",
    confirmPasswordValidateStatus: "",

    remember: false,
    animationToggle: false,
    firstTime: 0
  });
  const onChangeValidator = (name, value) => {
    switch (name) {
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
      case "confirmPassword":
        if (value !== formData.password) {
          setFormData({
            ...formData,
            [name]: value,
            confirmPasswordValidateStatus: "error",
            confirmPasswordHelp: "Password does not match or valid yet",
            confirmPasswordIsValid: false
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            confirmPasswordValidateStatus: "success",
            confirmPasswordHelp: "",
            confirmPasswordIsValid: true
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
    }
  };

  const handleChange = e => {
    if (
      e.target.name === "email" ||
      e.target.name === "password" ||
      e.target.name === "confirmPassword"
    ) {
      onChangeValidator(e.target.name, e.target.value);
    }
  };

  const handleSubmit = e => {
    const { email, password, remember } = formData;
  
    dispatch(RegisterMiddleware.getRegister({ email, password }));
  };

  return (
    <div>
      {AuthReducer.auth ? (
        AuthReducer.auth.user ? (
          AuthReducer.auth.user._id ? (
            <Redirect to="createProfile" />
          ) : null
        ) : null
      ) : null}
      <div className="registerPageItem">
        <div className="RegisterItems">
          <h1>Register Form</h1>
          <FormGroup className="groupItem">
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
          <FormGroup className="groupItem">
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="password"
            />
            <p className="errorShow">{formData.passwordHelp}</p>
          </FormGroup>
          <FormGroup className="groupItem">
            <Label for="examplePassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            <p className="errorShow">{formData.confirmPasswordHelp}</p>
          </FormGroup>
          {AuthReducer.displaySpinner && (
            <Spinner animation="border" variant="primary" />
          )}

          {!AuthReducer.displaySpinner && (
            <Button
              disabled={
                !formData.passwordIsValid ||
                !formData.emailIsValid ||
                !formData.confirmPasswordIsValid
              }
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          )}
          <p className="EmailExit">
            {AuthReducer.errors
              ? AuthReducer.errors.message
                ? AuthReducer.errors.message.indexOf("duplicate") > 5
                  ? "You email is already exits. Please Click on below link to login"
                  : "Some thing is going wrong"
                : ""
              : ""}{" "}
          </p>

          <Link className="linkstyle" to="/login">
            {" "}
            <p> Already a member Please click on me</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
