import { put, takeLatest, all, call } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import CartActionTypes from "./cart.types";

import {
  clearCart,
  addItemSuccess,
  addItemFailure,
  removeItemSuccess,
  removeItemFailure,
  clearItemFromCartSuccess,
  clearItemFromCartFailure,
  fetchCartSuccess,
  fetchCartFailure,
} from "./cart.actions";

export function* fetchCartAsync({ payload }) {
  try {
    const response = yield call(fetch, "/api/shop/cart", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + payload,
      },
    });
    const cartData = yield response.json();
    yield put(fetchCartSuccess(cartData.cart));
  } catch (error) {
    yield put(fetchCartFailure(error.message));
  }
}

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* addToCart({ payload: { _id, token } }) {
  try {
    const response = yield call(
      fetch,
      `/api/shop/collection/add/${_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const cart = yield response.json();
    yield put(addItemSuccess(cart.newCart));
  } catch (error) {
    yield put(addItemFailure(error.message));
  }
}

export function* removeFromCart({ payload: { _id, token } }) {
  try {
    const response = yield call(
      fetch,
      `/api/shop/collection/remove/${_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const cart = yield response.json();
    yield put(removeItemSuccess(cart.newCart));
  } catch (error) {
    yield put(removeItemFailure(error.message));
  }
}

export function* clearItemFromCart({ payload: { _id, token } }) {
  try {
    const response = yield call(
      fetch,
      `/api/shop/collection/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const cartData = yield response.json();
    yield put(clearItemFromCartSuccess(cartData.newCart));
  } catch (error) {
    yield put(clearItemFromCartFailure(error.message));
  }
}

export function* onFetchCartStart() {
  yield takeLatest(CartActionTypes.FETCH_CART_START, fetchCartAsync);
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onAddToCartStart() {
  yield takeLatest(CartActionTypes.ADD_ITEM_START, addToCart);
}

export function* onRemoveFromCartStart() {
  yield takeLatest(CartActionTypes.REMOVE_ITEM_START, removeFromCart);
}

export function* onClearItemFromCartStart() {
  yield takeLatest(CartActionTypes.CLEAR_ITEM_START, clearItemFromCart);
}

export function* cartSagas() {
  yield all([
    call(onFetchCartStart),
    call(onSignOutSuccess),
    call(onAddToCartStart),
    call(onRemoveFromCartStart),
    call(onClearItemFromCartStart),
  ]);
}
