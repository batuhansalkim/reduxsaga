import { all } from 'redux-saga/effects';
import { watchFetchUsers } from './user/userSaga';
import { watchFetchPosts } from './post/postSaga';

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchPosts(),
  ]);
}
