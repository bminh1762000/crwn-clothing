import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { SignUpContainer } from "./sign-up.styles";
import { signUpStart } from "../../redux/user/user.actions";

const SignUp = ({ signUpStart }) => {
  const initialValues = {
    displayName : '',
    email : '',
    password : '',
    confirmPassword : '',
  }
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword} = values;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ email, password, displayName });
    setValues(initialValues);
  };
  
  const handleInputChange = event => {
    const {name, value} = event.target;

    setValues({...values, [name] : value});
  }

  return (
    <SignUpContainer>
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={values.displayName}
          onChange={handleInputChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          label="Confirm Password"
          required
        />
        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
