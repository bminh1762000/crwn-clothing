import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionsAsync() {
  let collectionsData;
  try {
    const resData = yield call(fetch, "http://localhost:8080/shop/collections");
    const collectionsMap = yield resData.json();
    collectionsData = collectionsMap.collections.reduce(
      (accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
      },
      {}
    );
    yield put(fetchCollectionsSuccess(collectionsData));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
