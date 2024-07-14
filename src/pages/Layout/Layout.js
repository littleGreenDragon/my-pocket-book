import { Link, Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import {loadBillList, billListSelector} from '@/store/modules/BillListSlice';
import {useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function Layout(){
    let dispatch = useDispatch();
    let billList = useSelector(billListSelector);
    useEffect(()=>{
        dispatch(loadBillList());
    },[dispatch]);
    return (
        <div>
            layout
            <Outlet/>
            <ul>
                {
                    billList.map(elem=><li key={elem.id}>{elem.useFor}</li>)
                }
            </ul>
            <Link to=''>月</Link>
            <Link to='/new'>新建</Link>
            <Link to='year'>年</Link>

        </div>
    )
}
export default Layout;