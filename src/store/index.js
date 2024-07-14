import billListReducers from '@/store/modules/BillListSlice';
import { configureStore } from '@reduxjs/toolkit';

let store = configureStore({
    reducer:{
        billList:billListReducers
    },
    devTools:process.env.NODE_ENV === 'production'
});

export default store;