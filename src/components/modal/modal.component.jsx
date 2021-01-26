import React from "react";
import ReactDOM from "react-dom";

import CustomButton from "../custom-button/custom-button.component";
import {
  ModalContainer,
  ModalHeaderContainer,
  ModalContentContainer,
  ModalActionContainer,
} from "./modal.styles";

const Modal = (props) =>
  ReactDOM.createPortal(
    <ModalContainer>
      <ModalHeaderContainer>
        <h1>{props.title}</h1>
      </ModalHeaderContainer>
      <ModalContentContainer>{props.children}</ModalContentContainer>
      <ModalActionContainer>
        <CustomButton onClick={props.onAcceptModal}>Cancel</CustomButton>
        <CustomButton onClick={props.onCancelModal}>Accept</CustomButton>
      </ModalActionContainer>
    </ModalContainer>,
    document.getElementById("modal-root")
  );

export default Modal;
