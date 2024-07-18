import billListReducers from '@/store/modules/BillListSlice';
import { configureStore,combineReducers } from '@reduxjs/toolkit';
import userReducers from '@/store/modules/UserSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

const rootReducers = combineReducers({
    billList:billListReducers,
    user:userReducers
});

const persistConfig = {
    key:'root',
    storage,
    // whitelist: ['billListReducers']//控制userReducers不进行持久化
};

const persisdReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer:persisdReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools:process.env.NODE_ENV === 'production'
});

let persistorStore = persistStore(store);

export {store, persistorStore};