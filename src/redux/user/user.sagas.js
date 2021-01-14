import { takeLatest, put, call, all } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  checkUserSessionSuccess,
  checkUserSessionFailure,
} from "./user.actions";

import { fetchCartStart } from "../cart/cart.actions";

export function* signWithEmailPassword({ payload: { email, password } }) {
  try {
    const response = yield call(fetch, "http://localhost:8080/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const userData = yield response.json();
    yield localStorage.setItem("token", userData.token);
    yield localStorage.setItem("userId", userData.userId);
    yield put(signInSuccess({ ...userData }));
    yield put(fetchCartStart(userData.token))
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("userId");
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const response = yield call(fetch, "http://localhost:8080/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: displayName,
      }),
    });
    const userData = yield response.json();
    yield put(signUpSuccess({ email: userData.email, password }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* isUserAuth() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) {
    yield put(checkUserSessionFailure());
  } else {
    yield put(checkUserSessionSuccess({ userId, token }));
    yield put(fetchCartStart(token))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signWithEmailPassword);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signWithEmailPassword);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION_START, isUserAuth);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onCheckUserSession),
  ]);
}
