import { Link, Outlet,useNavigate } from "react-router-dom";
import {loadBillList, billListSelector} from '@/store/modules/BillListSlice';
import {useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TabBar } from "antd-mobile"
import '@/pages/Layout/index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'

const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: 'year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

function Layout(){
    const dispatch = useDispatch();
    const billList = useSelector(billListSelector);
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(loadBillList());
    },[dispatch]);
    function switchRoute(path){//切换菜单跳转路由
        navigate(path);
    }
    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout;