import { takeLatest, put, all, call } from "redux-saga/effects";

import dirActionTypes from "./directory.types";

import { fetchDirFailure, fetchDirSuccess } from "./directory.actions";

export function* fetchDirectoryAsync() {
  try {
    const response = yield call(fetch, "/api/preview/directory");
    const dirData = yield response.json();
    yield put(fetchDirSuccess(dirData.directory));
  } catch (error) {
    yield put(fetchDirFailure(error.message));
  }
}

export function* fetchDirectoryStart() {
  yield takeLatest(dirActionTypes.FETCH_DIRECTORY_START, fetchDirectoryAsync);
}

export function* directorySagas() {
  yield all([call(fetchDirectoryStart)]);
}
