import { combineReducers } from 'redux';
import userReducer from './user/userSlice';
import postReducer from './post/postSlice';

// Şimdilik boş bir reducer, ileride user ve post reducerları eklenecek
const dummyReducer = (state = {}, action) => state;

const rootReducer = combineReducers({
  dummy: dummyReducer,
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
