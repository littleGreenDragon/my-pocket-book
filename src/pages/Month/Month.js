import { NavBar, DatePicker } from 'antd-mobile'
import '@/pages/Month/index.scss'
import { useState } from 'react'
import classNames from 'classnames';

const Month = () => {
    let [show, setShow] = useState(false);

    function confirm(data){
        console.log(data);
        console.log(data.getYear());
        console.log(data.getMonth());
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
                2023 | 3月账单
                </span>
                {/* expand会让箭头朝上 */}
                <span className={classNames('arrow',{expand:!show})}></span>
            </div>
            {/* 统计区域 */}
            <div className='twoLineOverview'>
                <div className="item">
                <span className="money">{100}</span>
                <span className="type">支出</span>
                </div>
                <div className="item">
                <span className="money">{200}</span>
                <span className="type">收入</span>
                </div>
                <div className="item">
                <span className="money">{200}</span>
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