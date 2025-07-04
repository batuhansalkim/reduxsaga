import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure,
  addPostRequest, addPostSuccess, addPostFailure,
  deletePostRequest, deletePostSuccess, deletePostFailure,
  updatePostRequest, updatePostSuccess, updatePostFailure
} from './postSlice';

function* fetchPostsSaga(action) {
  try {
    const userId = action.payload;
    const response = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* addPostSaga(action) {
  try {
    const { userId, title, body } = action.payload;
    const response = yield call(
      axios.post,
      'https://jsonplaceholder.typicode.com/posts',
      { userId, title, body }
    );
    yield put(addPostSuccess(response.data));
  } catch (error) {
    yield put(addPostFailure(error.message));
  }
}

function* deletePostSaga(action) {
  try {
    const postId = action.payload;
    yield call(
      axios.delete,
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    yield put(deletePostSuccess(postId));
  } catch (error) {
    yield put(deletePostFailure(error.message));
  }
}

function* updatePostSaga(action) {
  try {
    const { id, title, body } = action.payload;
    const response = yield call(
      axios.put,
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      { title, body }
    );
    yield put(updatePostSuccess(response.data));
  } catch (error) {
    yield put(updatePostFailure(error.message));
  }
}

export function* watchFetchPosts() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(addPostRequest.type, addPostSaga);
  yield takeLatest(deletePostRequest.type, deletePostSaga);
  yield takeLatest(updatePostRequest.type, updatePostSaga);
}
