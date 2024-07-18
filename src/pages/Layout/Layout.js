import { Outlet,useLocation,useNavigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import { TabBar,NavBar } from "antd-mobile"
import '@/pages/Layout/index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline,
  UserOutline
} from 'antd-mobile-icons'

const tabs = [
  {
    key: '/layout',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/layout/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
  {
    key:'/layout/home',
    title:'我的',
    icon:<UserOutline />
  }
]

function Layout(){
    const navigate = useNavigate();
    const location = useLocation();

    const [now, setNow] = useState(location.pathname);//控制底部导航

    const now_obj = tabs.find(elem=>elem.key===now);

   function  switchRoute(path){//切换菜单跳转路由
        setNow(path);
        navigate(path);
    }
    return (
        <div className="layout">
            <NavBar className="nav" backArrow={false}>
                {now_obj.title}
            </NavBar>
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar 
                  onChange={switchRoute} 
                  activeKey={now}
                  defaultActiveKey={'/layout'}
                >
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout;