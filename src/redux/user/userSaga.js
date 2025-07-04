import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from './userSlice';

function* fetchUsersSaga() {
  try {
    const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export function* watchFetchUsers() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
} 