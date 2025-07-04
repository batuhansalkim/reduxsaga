import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  adding: false,
  addError: null,
  deleting: false,
  deleteError: null,
  updating: false,
  updateError: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    fetchPostsRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.posts = [];
    },
    fetchPostsSuccess(state, action) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPostRequest(state) {
      state.adding = true;
      state.addError = null;
    },
    addPostSuccess(state, action) {
      state.adding = false;
      state.posts = [action.payload, ...state.posts];
    },
    addPostFailure(state, action) {
      state.adding = false;
      state.addError = action.payload;
    },
    deletePostRequest(state) {
      state.deleting = true;
      state.deleteError = null;
    },
    deletePostSuccess(state, action) {
      state.deleting = false;
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    deletePostFailure(state, action) {
      state.deleting = false;
      state.deleteError = action.payload;
    },
    updatePostRequest(state) {
      state.updating = true;
      state.updateError = null;
    },
    updatePostSuccess(state, action) {
      state.updating = false;
      const updated = action.payload;
      state.posts = state.posts.map(post => post.id === updated.id ? updated : post);
    },
    updatePostFailure(state, action) {
      state.updating = false;
      state.updateError = action.payload;
    },
  },
});

export const {
  fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure,
  addPostRequest, addPostSuccess, addPostFailure,
  deletePostRequest, deletePostSuccess, deletePostFailure,
  updatePostRequest, updatePostSuccess, updatePostFailure
} = postSlice.actions;
export default postSlice.reducer;
