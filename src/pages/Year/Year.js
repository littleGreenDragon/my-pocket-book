import "@/pages/Year/index.scss";
import Chart from "@/components/Chart/Chart";
import { useSelector } from "react-redux";
import { billListSelector } from "@/store/modules/BillListSlice";
import { useCallback, useMemo } from "react";
import {earnTypeToParent, payTypeToParent} from '@/const/billType';

function Year(){
   const billList = useSelector(billListSelector);
   const [earnList, payList] = useMemo(()=>{//数据更新了再做,正常来说应该后端做完计算给我
        // console.log(billList);
        const earnList = [];
        const payList = [];
        billList.forEach((elem)=>{
            if(elem.type == 'pay'){
                payList.push(elem);
            }else{
                earnList.push(elem);
            }
        });
        // console.log(earnList, payList);
        return [earnList, payList];
   }, [billList]);

   const createChartData = (data, type)=>{
        let typeMap = type==='pay'? payTypeToParent:earnTypeToParent;
        console.log(data,type, typeMap);
        const dataList = new Map();//键是类别，值是钱
        data.forEach(elem=>{
            let parentType = typeMap.get(elem.useFor);
            // console.log(elem.useFor, dataList.has(parentType))
            if(dataList.has(parentType)){
                dataList.set(parentType, dataList.get(parentType)+elem.money);
            }else{
                dataList.set(parentType, elem.money);
            }
        });
        const res = [];
        for(let [key, value] of dataList){
            res.push({name:key, value:Math.abs(value)});//哈哈哈哈，我真是谢谢，不支持负数
        }
        return res;
   }

   const payData = useMemo(()=>{//[{value,name}]
     return createChartData(payList, 'pay');
   },[payList]);

   const earnData = useMemo(()=>{
    return createChartData(earnList, 'earn');
   },[earnList]);

//    console.log('payData',payData);
//    console.log('earnData',earnData);
    return (
            <div className="mask">
                <Chart 
                type={'earn'}
                download={false}
                data={earnData} 
                />
                <Chart 
                type={'pay'} 
                download={true}
                data={payData} 
                />
            </div>
        )
}
export default Year;