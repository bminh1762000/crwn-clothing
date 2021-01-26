import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";
import ErrorHandler from "../../components/errorHandler/errHandler.component";
import { setError } from "../../redux/user/user.actions";
import { selectErrorUser } from "../../redux/user/user.selectors";

import { SignInAndUpContainer } from "./sign-in-and-sign-up.styles";

const SignInAndSignUpPage = ({ error, setError }) => {
  return (
    <>
      {error && <ErrorHandler message={error} onHandle={() => setError()} />}
      <SignInAndUpContainer>
        <SignIn />
        <SignUp />
      </SignInAndUpContainer>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectErrorUser,
});

const mapDispatchToProps = (dispatch) => ({
  setError: () => dispatch(setError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInAndSignUpPage);
