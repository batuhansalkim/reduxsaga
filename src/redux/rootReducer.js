import { combineReducers } from 'redux';
//Redux’un birden fazla reducer’ı tek bir reducer’da birleştirmesini sağlar.
import userReducer from './user/userSlice';
//Kullanıcılarla ilgili state’i yönetir.
import postReducer from './post/postSlice';
//Postlarla ilgili state’i yönetir.


// Şimdilik boş bir reducer, ileride user ve post reducerları eklenecek
//Redux’ta, uygulamanın tüm state’ini yöneten ana reducer’dır.
//Farklı feature’lara (ör. user, post) ait reducer’ları birleştirir.
//Store’a tek bir “root” reducer olarak verilir.

const dummyReducer = (state = {}, action) => state; //Başlangıçta boş bir reducer, ileride kaldırılabilir.

//user ve post state’lerini birleştirir.
//Uygulamanın global state’i bu yapı üzerinden yönetilir.
const rootReducer = combineReducers({
  dummy: dummyReducer,
  user: userReducer,
  post: postReducer,
});

export default rootReducer;
