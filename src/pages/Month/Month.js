import { NavBar, DatePicker } from 'antd-mobile'
import '@/pages/Month/index.scss'
import { useMemo, useState } from 'react'
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { billListSelector } from '@/store/modules/BillListSlice';
import _ from 'lodash';

const Month = () => {
    //时间选择器是否展示状态
    const [show, setShow] = useState(false);
    //时间状态
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY | MM'));
    //账本列表状态
    const billList = useSelector(billListSelector);
    const billListGroup = useMemo(()=>{//将账单按时间分组,只有账单发生变化才更新
        return _.groupBy(billList, (elem)=>dayjs(elem.date).format('YYYY | MM'));
    },[billList]);
    const [pay, earn, sum] = useMemo(()=>{//只有当前时间发生变化的时候更新
        console.log('重新计算');
        let pay = 0;
        let earn = 0;
        billListGroup[date]?.forEach((elem)=>{
            if(elem.type === 'income'){
                earn+=elem.money;
            }else if(elem.type === 'pay'){
                pay+=elem.money;
            }
        });
        return [pay, earn , pay+earn];
    },[date]);

    function confirm(data){//点击确认修改时间并隐藏时间选择器
        setDate(dayjs(data).format('YYYY | MM'))
        setShow(false);
    }

    return (
        <div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
            月度收支
        </NavBar>
        <div className="content">
            <div className="header" onClick={()=>setShow(!show)}>
            {/* 时间切换区域 */}
            <div className="date">
                <span className="text">
                {date}月账单
                </span>
                {/* expand会让箭头朝上 */}
                <span className={classNames('arrow',{expand:!show})}></span>
            </div>
            {/* 统计区域 */}
            <div className='twoLineOverview'>
                <div className="item">
                <span className="money">{pay.toFixed(2)}</span>
                <span className="type">支出</span>
                </div>
                <div className="item">
                <span className="money">{earn.toFixed(2)}</span>
                <span className="type">收入</span>
                </div>
                <div className="item">
                <span className="money">{sum.toFixed(2)}</span>
                <span className="type">结余</span>
                </div>
            </div>
            {/* 时间选择器 */}
            <DatePicker
                className="kaDate"
                title="记账日期"
                precision="month"
                visible={show}
                max={new Date()}
                onClose={()=>setShow(false)}
                onConfirm={confirm}
            />
            </div>
        </div>
        </div >
    )
}

export default Month