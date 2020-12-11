import React, { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {ContactFormContainer, MessageContainer, ButtonSubmitContainer} from './page-item.styles';

const Contact = () => {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: ""
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues(initialValues);
  };

  return (
    <ContactFormContainer>
      <h1>Contact Us</h1>
      <p>Get in touch and let us know how we can help.</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="name"
          type="text"
          handleChange={handleChange}
          value={values.name}
          label="Name"
          required
        />
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={values.email}
          label="Email"
          required
        />
        <FormInput
          name="subject"
          type="text"
          handleChange={handleChange}
          value={values.subject}
          label="Subject"
          required
        />
        <MessageContainer>
          <label htmlFor="message">Message</label>
          <textarea name="message" value={values.message} onChange={handleChange} rows="5" />
        </MessageContainer>
        <ButtonSubmitContainer>
          <CustomButton type="submit">Send Email</CustomButton>
        </ButtonSubmitContainer>
      </form>
    </ContactFormContainer>
  );
};

export default Contact;
