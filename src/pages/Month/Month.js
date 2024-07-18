import { NavBar, DatePicker, FloatingBubble } from 'antd-mobile'
import '@/pages/Month/index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { billListSelector, loadBillList } from '@/store/modules/BillListSlice';
import _ from 'lodash';
import DayBill from '@/components/DayBill/DayBill';
import { EditSOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';

const Month = () => {
    // console.log('子组件');
    const navigate = useNavigate();
    //时间选择器是否展示状态
    const [show, setShow] = useState(false);
    //时间状态
    const [date, setDate] = useState(dayjs(new Date()).format('YYYY | MM'));
    const user = useSelector(elem=>elem.user);
    //账本列表状态
    const billList = useSelector(billListSelector);
    //将账单按时间分组,账单发生变化更新
    const billListGroup = useMemo(()=>{
        if(billList.length===1 && billList[0] === undefined) return [];
        // console.log("进行分组",billList);
        return _.groupBy(billList, (elem)=>{
            return dayjs(elem.date).format('YYYY | MM')
        });
    },[billList]);
    //当前时间发生变化的时候更新，正常来说这玩意不应该是我来算，应该后端算完了返给我，然后我只需要分页获取数据就好了，不用全部拿到手
    const [pay, earn, sum, dayGroup] = useMemo(()=>{
        let pay = 0;
        let earn = 0;
        billListGroup[date]?.forEach((elem)=>{
            if(elem.type === 'income'){
                earn+=elem.money;
            }else if(elem.type === 'pay'){
                pay+=elem.money;
            }
        });
        let dayGroup =  _.groupBy(billListGroup[date], (elem)=>{
            return dayjs(elem.date).format('YYYY | MM | DD');
        });
        return [pay, earn , pay+earn, dayGroup];
    },[billListGroup[date]]);

    const dispatch = useDispatch();
    useEffect(()=>{
        // console.log('执行获取账单')
        dispatch(loadBillList(user.id));
    },[dispatch]);

    function confirm(data){//点击确认修改时间并隐藏时间选择器
        setDate(dayjs(data).format('YYYY | MM'))
        setShow(false);
    }

    function createNew(){
        navigate('/new');
    }

    return (
        <div className="monthlyBill">
            
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
                <div className='billlist'>
                    {
                        Object.entries(dayGroup)?.map((elem)=>{
                            return (
                                <DayBill key={elem[0]} timeList={elem} />
                            );
                        })
                    }
                </div>
                <FloatingBubble
                    axis='xy'
                    magnetic='x'
                    style={{
                        '--initial-position-bottom': '10%',
                        '--initial-position-right': '5%',
                        '--edge-distance': '5%',
                        zIndex:1000
                    }}
                    onClick={createNew}
                >
                    <EditSOutline fontSize={25}/>
                </FloatingBubble>
            </div>
        </div >
    )
}

export default Month