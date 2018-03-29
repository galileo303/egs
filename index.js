import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Input } from 'antd';
import { Button } from 'antd';
import { Select } from 'antd';
import { Table } from 'antd';

const Option = Select.Option;
var selectValue=0;
const key = "138e8e105a653e9f12fa1ec9d8e99f04";
const city = "上海";
const defaultDate = "2018-3-24"
const defaultTime =  "8:00"

const slocationValue = {location:"0,0"};
const elocation1Value = {location:"0,0"};
const elocation2Value = {location:"0,0"};

const dataSource = [{
    plan: '目标线路A',
    distance: null,
    taxi_cost: null,
    cost: null,
    duration: null,
    walking_distance: null,
    segments_size:null
},{
    plan: '目标线路B',
    distance: null,
    taxi_cost: null,
    cost: null,
    duration: null,
    walking_distance: null,
    segments_size:null
}];

const columns = [{
    title: '路线方案',
    dataIndex: 'plan',
    key: 'plan',
}, {
    title: '起点和终点的距离',
    dataIndex: 'distance',
    key: 'distance',
}, {
    title: '出租车费用',
    dataIndex: 'taxi_cost',
    key: 'taxi_cost',
}, {
    title: '换乘价格',
    dataIndex: 'cost',
    key: 'cost',
}, {
    title: '预期时间',
    dataIndex: 'duration',
    key: 'duration',
}, {
    title: '步行距离',
    dataIndex: 'walking_distance',
    key: 'walking_distance',
}, {
    title: '换乘次数',
    dataIndex: 'segments_size',
    key: 'segments_size',
}];


function searchAddress(){
    var sAddress = document.getElementById("startaddress").value;
    var eAddress1 = document.getElementById("endAddress1").value;
    var eAddress2 = document.getElementById("endAddress2").value;

    var startPO =  document.getElementById("sLocation");
    var endPO1 =  document.getElementById("eLocation1");
    var endPO2 =  document.getElementById("eLocation2");

    var questUrl = "http://restapi.amap.com/v3/geocode/geo?key="+key+"&address="+sAddress+"&city="+city;

    doGet(questUrl,"oMap",startPO,0);

    questUrl = "http://restapi.amap.com/v3/geocode/geo?key="+key+"&address="+eAddress1+"&city="+city;

    doGet(questUrl,"dMap1",endPO1,1);

    questUrl = "http://restapi.amap.com/v3/geocode/geo?key="+key+"&address="+eAddress2+"&city="+city;

    doGet(questUrl,"dMap2",endPO2,2);


}

function doQueryPlan(flag){

    console.log(slocationValue.location,elocation1Value.location,elocation2Value.location);
    let vLocation;
    if(flag === 1){
        vLocation = elocation1Value.location;
    }else{
        vLocation = elocation2Value.location;
    }

    let planURL = "http://restapi.amap.com/v3/direction/transit/integrated?key=" + key 
    +"&origin="+slocationValue.location
    + "&destination=" + vLocation 
    + "&city="+city
    +"&cityd="+city
    +"&strategy="+selectValue
    +"&nightflag=0&date="+defaultDate
    +"&time="+defaultTime;

    console.log(planURL)

    fetch(planURL).then((res)=>{
        if(res.ok){
            
            res.text().then((data)=>{
                let planInfo = (JSON.parse(data));

                console.log(data)
                let message = "线路规划信息：";

                //起点和终点的步行距离
                let distance = planInfo.route.distance;
                message = message + "起点和终点的步行距离:" + distance + "米;   ";
                dataSource[flag-1].distance = distance;
                console.log(dataSource);
                //出租车费用
                let taxi_cost = planInfo.route.taxi_cost;
                message = message + "出租车费用:" + taxi_cost + "元;   ";
                //默认首选第一个换乘线路
                let plan =  planInfo.route.transits[0];
                //线路-此换乘方案价格
                let cost = plan.cost;
                message = message + "换乘方案价格:" + cost + " 元;   ";
                //线路-此换乘方案预期时间
                let duration = plan.duration;
                message = message + "换乘方案预期时间:" + duration + " 秒;   ";
                //线路-此方案总步行距离
                let walking_distance = plan.walking_distance;
                message = message + "方案总步行距离:" + walking_distance + "米;   ";
                //线路-换乘方案
                let segments_size = plan.segments.length;
                message = message + "换乘方案次数:" + segments_size + "次;   ";
                if(flag === 1){
                    document.getElementById("transitInfo1").innerText = message;
                }else{
                    document.getElementById("transitInfo2").innerText = message;
                }

                React.render(document.getElementById('planInfo'));

            })
        }
    }).catch((res)=>{
        console.log(res.status);
    });

}

function doGet(url,mapId,inputObj,flag){
    fetch(url).then((res)=>{
        if(res.ok){
            res.text().then((data)=>{
                console.log(data);
                let locationValue = (JSON.parse(data)).geocodes[0].location;
                inputObj.value = locationValue
                if(flag === 0 ){
                    slocationValue.location=locationValue;
                }else if(flag === 1){
                    elocation1Value.location=locationValue;
                }else{
                    elocation2Value.location=locationValue;
                }
                console.log(slocationValue.location,elocation1Value.location,elocation2Value.location);
                restMap(mapId,locationValue);

                if(flag === 2 || flag === 1){
                    doQueryPlan(flag);
                }
            })
        }
    }).catch((res)=>{
        console.log(res.status);
    });

}

function restMap(mapId,location){

    var newUrl = "http://restapi.amap.com/v3/staticmap?location="+location+"&zoom=16&size=550*550&markers=mid,,A:"+location+"&key=" + key;

    console.log(newUrl);
    document.getElementById(mapId).src = newUrl;

}

function handleChange(value) {
    console.log(`selected ${value}`);
    selectValue = value;
}

function App() {


    var mapurl = "http://restapi.amap.com/v3/staticmap?location=0,0&zoom=16&size=550*550&markers=mid,,A:0,0&key=" + key;


  return (
    <div style={{ margin: 50 }}>
      <h1>Address Location & Plan</h1>
      <hr /><br />
        <Input size="large" placeholder="起点" id="startaddress" defaultValue={"中山西路1410弄"}/>-

        目标A：<Input size="large" placeholder="终点A" id="endAddress1" defaultValue={"东方金融广场"}/>
        目标B：<Input size="large" placeholder="终点B" id="endAddress2" defaultValue={"普华永道"}/>
        <Button type="primary" icon="search" onClick={searchAddress}>Compare</Button>
        <br />
        <Input size="large"  placeholder="定位坐标" id="sLocation"/>-
        目标A：<Input size="large"  placeholder="定位坐标" id="eLocation1"/>
        目标B：<Input size="large"  placeholder="定位坐标" id="eLocation2"/>
        <Select defaultValue="0" style={{ width: 120 }} onChange={handleChange}>
            <Option value="0">最快捷模式</Option>
            <Option value="1">最经济模式</Option>
            <Option value="2">最少换乘模式</Option>
            <Option value="3">最少步行模式</Option>
            <Option value="5">不乘地铁模式</Option>
        </Select>
        <br />
        <hr />
        <div id="transitInfo1"></div>
        <div id="transitInfo2"></div>
        <div>
            <Table id="planInfo" dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        <br />
        <img id="oMap" src={mapurl} /> <img id="dMap1" src={mapurl} /> <img id="dMap2" src={mapurl} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
