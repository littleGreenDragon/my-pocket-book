import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/const/billType'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBill } from '@/store/modules/BillListSlice'
import dayjs from 'dayjs'
import { set } from 'lodash';
import { v4 } from 'uuid'

const New = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('pay'); 
  const [money, setMoney] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [useFor, setUseFor] = useState('food');

  const dispatch = useDispatch();

  function addOneBill(){
    let bill = {
        type,
        money:type==='pay'? -+money:money,
        date: dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
        useFor,
        id: v4()
    }
    dispatch(addBill(bill));
    navigate(-1);
  }

  function confirm(day){//点击确认修改时间并隐藏时间选择器
    setDate(day);
    setShow(false);
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({selected:type==='pay'})}
            onClick={()=>{setType('pay')}}
          >
            支出
          </Button>
          <Button
            className={classNames({selected:type==='income'})}
            shape="rounded"
            onClick={()=>{setType('income')}}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={()=>setShow(true)}>
              <Icon img="calendar" className="icon" />
              <span className="text">
                {dayjs(date).format('YYYY-MM-DD')}
              </span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                onSelect={(day)=>setDate(day)}
                value={date}
                visible={show}
                onClose={()=>setShow(false)}
                onConfirm={confirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money===0? '':money}
                onChange={(value)=>setMoney(Math.abs(Number(value)))}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map(first => {
          return (
            <div className="kaType" key={first.type}>
              <div className="title">{first.name}</div>
              <div className="list">
                {first.list.map(second => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        {}
                      )}
                      key={second.type}
                      onClick={()=>setUseFor(second.type)}
                    >
                      <div className="icon">
                        <Icon img={second.type} />
                      </div>
                      <div className="text">{second.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={addOneBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New