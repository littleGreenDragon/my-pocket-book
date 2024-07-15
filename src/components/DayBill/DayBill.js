import classNames from 'classnames'
import '@/components/DayBill/index.scss'
import { useMemo } from 'react';

const DayBill = ({timeList}) => {
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

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{timeList[0]}</span>
          <span className={classNames('arrow')}></span>
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
    </div>
  )
}
export default DayBill