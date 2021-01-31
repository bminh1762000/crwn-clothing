import styled from "styled-components";

export const ContactFormContainer = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 35px;
    margin: 5px 0;
  }

  p {
    font-size: 20px;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 10px;
  }
`;

export const ButtonSubmitContainer = styled.div`
  display: flex;
  justify-content: center;
`;
