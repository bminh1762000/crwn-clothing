import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { required, isEmail, length } from "../../util/validators.js";

import {
  ContactFormContainer,
  MessageContainer,
  ButtonSubmitContainer,
} from "./contact-item.styles";

const Contact = () => {
  const initialValues = {
    contactForm: {
      name: {
        value: "",
        valid: true,
        validators: [required, length({ min: 3 })],
      },
      email: {
        value: "",
        valid: true,
        validators: [required, isEmail],
      },
      subject: {
        value: "",
        valid: true,
        validators: [required],
      },
      message: {
        value: "",
        valid: true,
        validators: [required],
      },
    },
    formValid: false,
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let isValid = true;
    for (const validator of values.contactForm[name].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...values.contactForm,
      [name]: {
        ...values.contactForm[name],
        valid: isValid,
      },
    };
    let isValidForm = true;
    for (const inputName in values.contactForm) {
      isValidForm = isValidForm && values.contactForm[inputName].valid;
    }
    setValues({ contactForm: updatedForm, formValid: isValidForm });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues(initialValues);
  };

  return (
    <ContactFormContainer>
      <h1>Contact Us</h1>
      <p>Get in touch and let us know how we can help.</p>
      <form
        onSubmit={handleSubmit}
        action="mailto:tunho176@gmail.com"
        method="POST"
        encType="text/plain"
      >
        <FormInput
          name="name"
          type="text"
          handleChange={handleChange}
          value={values.contactForm.name.value}
          label="Name"
          isValid={values.contactForm.name.valid}
        />
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={values.contactForm.email.value}
          label="Email"
          isValid={values.contactForm.email.valid}
        />
        <FormInput
          name="subject"
          type="text"
          handleChange={handleChange}
          value={values.contactForm.subject.value}
          label="Subject"
          isValid={values.contactForm.subject.valid}
        />
        <MessageContainer>
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            value={values.contactForm.message.value}
            onChange={handleChange}
            rows="5"
            isValid={values.contactForm.message.valid}
          />
        </MessageContainer>
        <ButtonSubmitContainer>
          <CustomButton type="submit">Send Email</CustomButton>
        </ButtonSubmitContainer>
      </form>
    </ContactFormContainer>
  );
};

export default Contact;
