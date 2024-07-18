import { createAsyncThunk, createEntityAdapter, createSlice,createSelector } from "@reduxjs/toolkit";
import { myAxios } from "@/util";


export let loadBillList = createAsyncThunk(
    'billList/loadBillList',
    (payload)=>{
        return myAxios({
            url:`640/ka?userId=${payload}`
        }).catch(error=>error.response);
    }
);
export let addBill = createAsyncThunk(
    'billList/addBill',
    (payload)=>{
        return myAxios({
            url:`660/ka`,
            method:'post',
            data:payload
        }).catch(error=>error.response);
    }
);


let billListAdapter = createEntityAdapter();
const {selectAll} = billListAdapter.getSelectors();

export const billListSelector = createSelector(
    (store)=>{
        // console.log(store)
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
            console.log('获取所有账单数据成功的回调', payload);
            billListAdapter.setAll(state, payload);
        }).addCase(loadBillList.rejected,(state, {payload})=>{
            console.log('error获取失败', state, payload);
        }).addCase(addBill.fulfilled,(state, {payload})=>{
            console.log('添加一个账单数据成功的回调')
            billListAdapter.addOne(state, payload);
        }).addCase(addBill.rejected, (state, {payload})=>{
            console.log('error上传失败',state, payload )
        });
    }
});

export default billListSlice.reducer;
