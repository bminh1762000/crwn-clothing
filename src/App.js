import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";
import { default as Spinners } from "./components/spinner/spinner.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSessionStart } from "./redux/user/user.actions";

import { GlobalStyle } from "./global.styles";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const ContactPage = lazy(() => import("./pages/contact/contact.component"));

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <Header />
      <GlobalStyle />
      <Suspense fallback={<Spinners />}>
        <Switch>
          <Route exact path="/crwn-clothing/" component={HomePage} />
          <Route path="/crwn-clothing/shop" component={ShopPage} />
          <Route path="/crwn-clothing/contact" component={ContactPage} />
          <Route
            exact
            path="/crwn-clothing/checkout"
            component={CheckoutPage}
          />
          <Route
            exact
            path="/crwn-clothing/signin"
            render={() =>
              currentUser ? (
                <Redirect to="/crwn-clothing" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route component={HomePage} />
        </Switch>
      </Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSessionStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
