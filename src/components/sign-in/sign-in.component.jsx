import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { SignInContainer, ButtonsContainer } from "./sign-in.styles";

import { required, isEmail, length } from "../../util/validators.js";
import { emailSignInStart } from "../../redux/user/user.actions";

const SignIn = ({ emailSignInStart }) => {
  const initialValues = {
    logInForm: {
      email: {
        value: "",
        valid: true,
        validators: [required, isEmail],
      },
      password: {
        value: "",
        valid: true,
        validators: [required, length({ min: 8 })],
      },
    },
    formValid: false,
  };

  const [values, setValues] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      logInForm: { email, password },
      formValid,
    } = values;
    if (!formValid) {
      alert("Form don't valid. Please enter valid form.");
      return;
    }
    emailSignInStart({ email: email.value, password: password.value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    for (const validator of values.logInForm[name].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...values.logInForm,
      [name]: {
        ...values.logInForm[name],
        value: value,
        valid: isValid,
      },
    };
    let isValidForm = true;
    for (const inputName in values.logInForm) {
      isValidForm = isValidForm && values.logInForm[inputName].valid;
    }
    setValues({ logInForm: updatedForm, formValid: isValidForm });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={values.logInForm.email.value}
          handleChange={handleChange}
          label="email"
          isValid={values.logInForm.email.valid}
        />
        <FormInput
          name="password"
          type="password"
          value={values.logInForm.password.value}
          handleChange={handleChange}
          label="password"
          isValid={values.logInForm.password.valid}
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
