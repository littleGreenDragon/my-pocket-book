import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Avatar,Ellipsis,Toast,Modal } from "antd-mobile";
import { SmileOutline, RightOutline, CheckShieldOutline } from 'antd-mobile-icons'

import  "@/pages/Home/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updatePassword, updateUser } from "@/store/modules/UserSlice";
import { removeToken } from "@/util";

const Home = () => {
    const user = useSelector(elem=>elem.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeInfo=()=>{
        Toast.show({
            content: '暂不可用'
          });
    };

    const changePass=()=>{
        Toast.show({
            content: '暂不可用'
          });
    }

    // 退出登录
    const logout = async () => {
        Modal.confirm({
            content: '真的要退出嘛',
            closeOnMaskClick: true,
            onConfirm:  () => {
              setTimeout(()=>{
                removeToken();
                Toast.show({
                    content: '退出成功',
                    afterClose: () => {
                        navigate('/');
                    },
                  });
              },1000);
            },
        })
    };

    return (
    <div className='user'>
        <img className='avatar'
            src={user.avatar} />
        <span className='nickname'>昵称：{user.username || "--"}</span>
        <div className='info'>
            <img
                style={{ width: 30, height: 30, verticalAlign: "-10px" }}
                src="//s.yezgea02.com/1615973630132/geqian.png"
                alt=""
            />
            <Ellipsis direction='end' content={user.signature || "暂无个签"} />
        </div>
        <div className='content' onClick={changeInfo}>
            <div>
                <SmileOutline />
                <span >用户信息修改</span>
            </div>
            <RightOutline />
        </div>
        <div className='content' onClick={changePass}>
            <div>
                <CheckShieldOutline />
                <span >重制密码</span>
            </div>
            <RightOutline />
        </div>
        <Button className='logout' block color="danger" onClick={logout}>退出登录</Button>
    </div>
    );
};

export default Home;