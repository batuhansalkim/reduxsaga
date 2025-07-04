//Redux-Saga, Redux’un asenkron işlemleri yönetmek için kullanılan bir middleware’dir.
//Redux’ta, asenkron işlemler (ör. API çağrıları) için kullanılır.
//Saga’lar, Redux’ta asenkron işlemleri yönetmek için kullanılır.
//Saga’lar, Redux’ta asenkron işlemleri yönetmek için kullanılır.

//Her feature’ın (ör. user, post) kendi saga watcher’ı olur, bunlar burada bir araya getirilir.
//Store başlatılırken saga middleware’e bu rootSaga verilir.
import { all } from 'redux-saga/effects';//Birden fazla saga’yı paralel olarak başlatmak için kullanılır.
import { watchFetchUsers } from './user/userSaga';//Kullanıcılarla ilgili saga’ları (ör. kullanıcıları çekme) izler.
import { watchFetchPosts } from './post/postSaga';//Postlarla ilgili saga’ları (ör. post çekme, ekleme, silme, güncelleme) izler.

//Bir generator fonksiyonudur (function*).
//yield all([...]) ile tüm watcher saga’lar paralel olarak başlatılır.

export default function* rootSaga() {
  yield all([
    watchFetchUsers(),
    watchFetchPosts(),
  ]);
}
