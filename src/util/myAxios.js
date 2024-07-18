import axios  from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router"

const myAxios = axios.create({
    baseURL:"http://localhost:3001/",//配置根域名
    timeout:5000//配置超时时间
});

//添加请求拦截器,配置请求头token拦截
myAxios.interceptors.request.use(
    (config) => {//添加请求头token
        const token = getToken();
        // console.log('拦截请求添加请求头权限,token为', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);
  
// 添加响应拦截器，将内容取出来再返回
myAxios.interceptors.response.use(
    (response) => {
        return response.data
    }, 
    (error) => {
        // 没有权限(主要是判断token是否过期)，跳转到登陆
        // console.dir(error)
        if (error.response.status === 401) {
            removeToken()
            router.navigate('/')
            window.location.reload()
        }
        return Promise.reject(error);
    }
)
 
// console.log(myAxios.defaults.baseURL);

export default myAxios;