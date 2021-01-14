import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { emailSignInStart } from "../../redux/user/user.actions";

import { SignInContainer, ButtonsContainer } from "./sign-in.styles";

const SignIn = ({ emailSignInStart }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = values;
    emailSignInStart({ email, password });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
          label="password"
          required
        />
        <ButtonsContainer>
          <CustomButton type="submit"> Sign in </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (emailAndPassword) =>
    dispatch(emailSignInStart(emailAndPassword)),
});

export default connect(null, mapDispatchToProps)(SignIn);
