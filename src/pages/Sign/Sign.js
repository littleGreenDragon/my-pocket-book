import React, { useState,  useEffect, useRef } from "react";
import { Input, Button, Toast, Tabs } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router-dom";
import {
    loadCaptchaEnginge,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from 'react-simple-captcha';
import '@/pages/Sign/index.scss'
import { useDispatch, useSelector } from "react-redux";
import {  registerUser, signIn } from "@/store/modules/UserSlice";

const Sign = () => {//修改，使用防抖的方式验证用户输入的内容
    const [type, setType] = useState("login"); // 登录注册类型
    const email = useRef('Jack@qq.com'); // 账号
    const password = useRef("123456"); // 密码
    const confirmPassword = useRef(""); // 二次密码
    const [verify, setVerify] = useState(""); // 验证码
    const [visible, setVisible] = useState(false);//密码是否显示
    const [confirmVisible, setConfirmVisible] = useState(false);//密码是否显示

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[]);

    const login = ()=>{
        if(!check()){
            return;
        }
        dispatch(signIn({
            data:{
                email:email.current,
                password:password.current
            },
            ok:()=>{
                Toast.show({
                    content: '登录成功',
                    afterClose: () => {
                        navigate('/layout');
                    },
                });
            },
            err:(err)=>{
                Toast.show({content: err.response.data});
            }
        }));
    }

    const register = ()=>{
        if(!check()){
            return;
        }
        dispatch(registerUser({
            data:{
                email:email.current,
                password:password.current
            },
            ok:()=>{
                Toast.show({content: '注册成功'});
                setType("login");
            },
            err:(err)=>{
                Toast.show({content: err.response.data});
            }
        }));
    }

    const check = () => {
        if (!password) {
            Toast.show({content: '请输入密码'});
            return false;
        }
        if (verify.length===0) {
            Toast.show({content: '请输入验证码'});
            return false;
        }
        if (validateCaptcha(verify) == false) {
            Toast.show({content: '验证码错误'});
            loadCaptchaEnginge(6);
            return false;
        }
        return true;
    };

    let emailTimer = useRef(null);
    function checkEmail(value){//检查邮箱是否合法
        checkDelay('email', email, value, emailTimer, ()=>{
            var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if(!reg.test(value)){
                Toast.show({content: '请检查您的验证码哦'});
            }
        });
    }

    let passwordTimer = useRef(null);
    function checkPassword(value){
        checkDelay('password', password, value, passwordTimer, ()=>{
            if(value.length < 6){
                Toast.show({content: '密码至少需要6位哦'});
            }
        });
    }

    let confirmPasswordTimer = useRef(null);
    function checkConfirmPassword(value){
        checkDelay('confirmPassword', confirmPassword, value, confirmPasswordTimer, ()=>{
            if(value != password.current){
                Toast.show({content: '两次密码不一样哦'});
            }
        });
    }

    function checkDelay(checkType, state, value, timer, deal){
        state.current = value;
        if(type === 'login' && checkType !== "email"){
            return ;
        }
        if(timer.current){//清除定时器
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(deal, 2000);
    }

  return (
    <div className='auth'>
        <Tabs activeKey={type} onChange={(key)=>{
                setType(key);
                loadCaptchaEnginge(6);
            }}>
          <Tabs.Tab title='登录' key='login'/>
          <Tabs.Tab title='注册' key='register'/>
        </Tabs>
        <div className='form'>
            <Input
                clearable
                type="text"
                placeholder="请输入邮箱"
                onChange={checkEmail}
                defaultValue={email.current}
                className="input"
            />
            <div className="password">
                <Input
                    clearable
                    type={visible ? 'text' : 'password'}
                    placeholder="请输入密码"
                    onChange={checkPassword}
                    className="input"
                    defaultValue={password.current}
                />
                <div className="eye">
                    {!visible ? (
                    <EyeInvisibleOutline onClick={() => setVisible(true)} />
                    ) : (
                    <EyeOutline onClick={() => setVisible(false)} />
                    )}
                </div>
            </div>
            {
                type==='register' && (
                    <div className="password">
                    <Input
                        clearable
                        type={confirmVisible ? 'text' : 'password'}
                        placeholder="请确认密码"
                        onChange={checkConfirmPassword}
                        className="input"
                        defaultValue={confirmPassword.current}
                    />
                    <div className="eye">
                        {!confirmVisible ? (
                        <EyeInvisibleOutline onClick={() => setConfirmVisible(true)} />
                        ) : (
                        <EyeOutline onClick={() => setConfirmVisible(false)} />
                        )}
                    </div>
                </div>
                )
            }
            <div className="password">
                <Input
                    clearable
                    type="text"
                    placeholder="请输入验证码"
                    onChange={(value) => setVerify(value)}
                    className="input"
                    value={verify}
                />
                <div onClick={()=>{
                        loadCaptchaEnginge(6);
                    }}>
                    < LoadCanvasTemplateNoReload /> 
                </div>
            </div>
            <div className='operation'>
                <Button onClick={type==='login'? login:register} block fill="outline" className="sign">
                {type == "login" ? "登录" : "注册"}
                </Button>
            </div>
        </div>
    </div>
  );
};

export default Sign;