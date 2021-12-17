import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './User/userReducers';

const persistConfig = {
	key: 'userData',
	storage: storage,
};
const pReducer = persistReducer(persistConfig, userReducer);

const store = createStore(pReducer);

const persistor = persistStore(store);

export { persistor, store };
