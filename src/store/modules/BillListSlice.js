import { createAsyncThunk, createEntityAdapter, createSlice,createSelector } from "@reduxjs/toolkit";
import axios from "axios";


export let loadBillList = createAsyncThunk(
    'billList/loadBillList',
    (payload)=>{
        return axios({
            url:'http://localhost:3001/ka'
        }).then(res=>res.data).catch(error=>error.response);
    }
);
let billListAdapter = createEntityAdapter();
const {selectAll} = billListAdapter.getSelectors();

export const billListSelector = createSelector(
    (store)=>{
        return store.billList
    },
    selectAll
);

let billListSlice = createSlice({
    name:'billList',
    initialState:billListAdapter.getInitialState(),
    // initialState:[],
    reducers:{//目前没看出来有什么需要同步执行的

    },
    extraReducers:(builder)=>{
        builder.addCase(loadBillList.fulfilled, (state, {payload})=>{
            console.log('执行将数据更新')
            billListAdapter.setAll(state, payload);
        }).addCase(loadBillList.rejected,(state, {payload})=>{
            console.log('error', state, payload);
        });
    }
});

export default billListSlice.reducer;
