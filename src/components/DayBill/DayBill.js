import classNames from 'classnames'
import '@/components/DayBill/index.scss'
import { useMemo, useState } from 'react';
import {billTypeToName} from '@/const/billType';
import Icon from '../Icon/Icon';

const DayBill = ({timeList}) => {
  //计算总值、支出、收入
  const [pay, earn, sum] = useMemo(()=>{
    let pay = 0;
    let earn = 0;
    timeList[1]?.forEach((elem)=>{
        if(elem.type === 'income'){
            earn+=elem.money;
        }else if(elem.type === 'pay'){
            pay+=elem.money;
        }
    });
    return [pay, earn , pay+earn];
  },[timeList]);

  //详细列表的展开和关闭
  const [showDatil, setShowDatil] = useState(false);

  return (
    <div className={classNames('dailyBill')} onClick={()=>setShowDatil(!showDatil)}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{timeList[0]}</span>
          <span className={classNames('arrow',{expand:!showDatil})}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{earn.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{sum.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{display:showDatil?'block':'none'}}>
        {
          timeList[1].map(item => {
            return (
              <div className="bill" key={item.id}>
                <div className="detail">
                  <Icon img={item.useFor} />
                  <div className="billType">{billTypeToName[item.useFor]}</div>
                </div>
                <div className={classNames('money', item.type)}>
                  {item.money.toFixed(2)}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default DayBill