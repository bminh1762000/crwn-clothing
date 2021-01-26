import React, { useState } from 'react'
import { connect } from "react-redux";

import { required, length, isEmail } from "../../util/validators";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { SignUpContainer } from "./sign-up.styles";
import { signUpStart } from "../../redux/user/user.actions";

const SignUp = ({ signUpStart }) => {
  const initialValues = {
    signUpForm: {
      displayName: {
        value: "",
        valid: true,
        validators: [required, length({ min: 3, max: 20 })],
      },
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
      confirmPassword: {
        value: "",
        valid: true,
        validators: [required, length({ min: 8 })],
      },
    },
    formValid: false,
  };
  const [values, setValues] = useState(initialValues);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      signUpForm: { email, password, displayName, confirmPassword },
      formValid,
    } = values;

    if (!formValid) {
      alert("Form don't valid. Please enter valid form");
      return;
    }
    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match");
      return;
    }

    signUpStart({
      email: email.value,
      password: password.value,
      displayName: displayName.value,
    });
    setValues(initialValues);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    for (const validator of values.signUpForm[name].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...values.signUpForm,
      [name]: {
        ...values.signUpForm[name],
        value: value,
        valid: isValid,
      },
    };
    let isValidForm = true;
    for (const inputName in updatedForm) {
      isValidForm = isValidForm && updatedForm[inputName].valid;
    }

    setValues({ signUpForm: updatedForm, formValid: isValidForm });
  };

  return (
    <SignUpContainer>
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={values.signUpForm.displayName.value}
          onChange={handleInputChange}
          label="Display Name"
          isValid={values.signUpForm.displayName.valid}
        />
        <FormInput
          type="email"
          name="email"
          value={values.signUpForm.email.value}
          onChange={handleInputChange}
          label="Email"
          isValid={values.signUpForm.email.valid}
        />
        <FormInput
          type="password"
          name="password"
          value={values.signUpForm.password.value}
          onChange={handleInputChange}
          label="Password"
          isValid={values.signUpForm.password.valid}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={values.signUpForm.confirmPassword.value}
          onChange={handleInputChange}
          label="Confirm Password"
          isValid={values.signUpForm.confirmPassword.valid}
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
