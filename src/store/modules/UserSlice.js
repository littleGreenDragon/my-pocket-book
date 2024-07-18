import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {myAxios} from "@/util";

// console.log(myAxios.defaults.baseURL)

export const getUserInfo = createAsyncThunk(
    "UserSlice/getUserInfo",
    (payload)=>{
        return myAxios({
            url:`/640/users?id=${payload}`
        }).then(res=>res[0]).catch(error=>error.response);
    }
);

export const updateUsername = createAsyncThunk(
    "UserSlice/updateUsername",
    (payload)=>{
        return myAxios({
            url:`/640/users?id=${payload}`,
            method:"patch",
            data:{
                username:payload.username
            }
        }).catch(error=>error.response);
    }
);

export const updateUser = createAsyncThunk(
    "UserSlice/updateUser",
    (payload)=>{
        return myAxios({
            url:`/640/users?id=${payload}`,
            method:"patch",
            data:payload
        }).catch(error=>error.response);
    }
);

export  const updatePassword = createAsyncThunk(
    "UserSlice/updatePassword",
    (payload)=>{
        return myAxios({
            url:`/640/users?id=${payload}`,
            method:"patch",
            data:{
                password:payload.password
            }
        }).catch(error=>error.response);
    }
);

export const updateEmail = createAsyncThunk(
    "UserSlice/updateEmail",
    (payload)=>{
        return myAxios({
            url:`/640/users?id=${payload}`,
            method:"patch",
            data:{
                email:payload.email
            }
        }).catch(error=>error.response);
    }
);

export const signIn = createAsyncThunk(
    "UserSlice/login",
    (payload, thunkAPI)=>{
        myAxios.post("/signin",payload.data)
        .then(res=>{
            thunkAPI.dispatch(setUser({res, func:payload.ok}));
        },err=>{
            payload.err(err);//出错了，直接显示就行，不需要给同步action
        });
    }
);

export const registerUser = createAsyncThunk(
    "UserSlice/register",
    (payload, thunkAPI)=>{
        myAxios.post('/register', payload.data)
        .then(res=>{
            payload.ok();
        },err=>{
            payload.err(err);
        })
    }
)

let userSlice = createSlice({
    name:'user',
    initialState:{
        id:0,
        username:'',
        email:'',
        token:''
    },
    reducers:{//把需要组件判断的部分写在这里
        setUser(state, {payload}){
            payload.func();//执行组件传来的回调
            return {
                ...state,
                ...payload.res.user,
                token:payload.res.accessToken
            }
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(updateUsername.fulfilled,(state, {payload})=>{
            console.log('修改姓名成功');
            state.username = payload;
        }).addCase(updateUsername.rejected, (state, {payload})=>{
            console.log('修改姓名失败', payload);
        }).addCase(updatePassword.fulfilled, (state, {payload})=>{
            console.log('修改密码成功');
        }).addCase(updatePassword.rejected, (state, {payload})=>{
            console.log('修改密码失败');
        }).addCase(updateEmail.fulfilled, (state, {payload})=>{
            console.log('修改邮箱成功');
            state.email = payload;
        }).addCase(updateEmail.rejected, (state, {payload})=>{
            console.log('修改邮箱失败');
        }).addCase(getUserInfo.fulfilled,(state, {payload})=>{
            console.log('获取用户信息');
            return {
                ...state,
                ...payload
            }
        }).addCase(getUserInfo.rejected,(state, {payload})=>{
            console.log('获取用户信息失败');
        }).addCase(updateUser.fulfilled, (state, {payload})=>{
            console.log('修改用户信息成功');
            return {
                ...state,
                ...payload
            }
        }).addCase(updateUser.rejected, (state, {payload})=>{
            console.log('修改用户信息失败');
        })
    }
});

export const {setUser} = userSlice.actions 
export default userSlice.reducer;