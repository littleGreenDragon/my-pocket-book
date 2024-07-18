import "@/pages/Year/index.scss";
import ReactEcharts from "echarts-for-react";
import { useState } from "react";

function Chart({
    type,
    download=false,
    data=[{ value: 0, name: '添加账单吧' }]
    }){
    //title是图标标题，types是类型提示（数组，元素字符串）, download（是否可以下载）, data是展示的数据(是一个数组，元素是{value,name})
    if(data.length===0){
      data = [{ value: 0, name: '添加账单吧' }];
    }
    console.log(data);
    let [show, setShow] = useState(); 
    const getOption = ()=>{
        const title = type==='pay'? "支出":"收入"
        let option = {
            title: {
                text: title,
                left: 'center'
              },
              tooltip: {//点击显示
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'//点击显示数据
              },
              aria:{
                enabled:true,
                decal:{
                    show:true
                }
              },
              toolbox: {//工具条
                show: true,
                feature: {
                  mark: { show: false },
                  dataView: { show: false, readOnly: false },//是否展示数据视图
                  restore: { show: false },
                  saveAsImage: { show: true }//是否可以下载
                }
              },
              series: [
                {
                  name: title,
                  type: 'pie',
                  radius: ["5%", "50%"],//饼状图半径（内半径，外半径）
                  center: ['50%', '50%'],
                  roseType: 'radius',
                  legendHoverLink : true,
                  itemStyle: {
                    borderRadius: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10,
                    decal:{
                        symbol:'circle'
                    }
                  },
                  label: {
                    show: true
                  },
                  emphasis: {
                    label: {
                      show: true
                    }
                  },
                  data:data
                }
              ]
            };
        return option;
    }
    return (
        <div className="bg">
            <ReactEcharts className="chart" id={type} option={getOption()}/>
        </div>
        )
}
export default Chart;