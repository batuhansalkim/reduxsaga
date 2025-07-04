//Redux store’unu oluşturur ve uygulamanın global state yönetimini başlatır.
//Saga middleware’i ekler ve rootSaga’yı çalıştırır.
//Uygulamanın tamamı bu store üzerinden state’e erişir ve günceller.

import { configureStore } from '@reduxjs/toolkit';
//Redux Toolkit’in store oluşturma fonksiyonu (modern ve kolay).
import createSagaMiddleware from 'redux-saga';
//Redux-Saga için middleware oluşturur.
import rootReducer from './rootReducer';
//Tüm state’i yöneten ana reducer.
import rootSaga from './rootSaga';
//Tüm saga’ları yöneten ana saga.
const sagaMiddleware = createSagaMiddleware();
//Saga işlemlerini yönetecek middleware.

const store = configureStore({ //Redux store’u oluşturulur.
  reducer: rootReducer,   //reducer olarak rootReducer verilir.
  middleware: (getDefaultMiddleware) => //middleware olarak sagaMiddleware eklenir (thunk kapatılır).
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); //Tüm saga’lar başlatılır.

export default store;
