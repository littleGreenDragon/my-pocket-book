import { Link, Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

function Layout(){
    return (
        <div>
            layout
            <Outlet/>
            <Link to=''>月</Link>
            <Link to='/new'>新建</Link>
            <Link to='year'>年</Link>
        </div>
    )
}
export default Layout;