import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userSlice} from './user/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {authApi} from '../screens/Authentication/auth-api';
import {shopApi} from '../screens/MainApp/Shop/shop-api';
import {cartSlice} from './cart/cartSlice';
import {paymentOrder} from '../screens/MainApp/Settings/payment-order-api';
import {categoriesApi} from '../screens/MainApp/Home/api/categories-api';
import {uiSlice} from './ui';
import api from './api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  // [authApi.reducerPath]: authApi.reducer,
  // [shopApi.reducerPath]: shopApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
  // [paymentOrder.reducerPath]: paymentOrder.reducer,
  // [categoriesApi.reducerPath]: categoriesApi.reducer,
});

const middleWares = [
  authApi.middleware,
  shopApi.middleware,
  paymentOrder.middleware,
  categoriesApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }).concat(middleWares),
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middleWares),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
