import React from 'react';
import { Layout, Menu, Icon, Table, Tabs , Button } from 'antd';
import BasicLayout from 'component/layout';
import WrappedHorizontalLoginForm from 'component/form';
import  { queryLocation , queryWay } from 'api/getLocation';
import { gaodeOption } from '../../config/gaodeSDK';
import UploadFile from 'component/upload';
import TableComp from 'component/table';
import { tableConfig } from '../../config/table.config';
import ExportExl from '../../util/excel.js';
import { getLocation } from '../../util/getLocation.core.js';
import DialogHOC from 'component/dialog';
// import Pic_1 from './img/1.png';
// import Pic_2 from './img/2.png';
// import Pic_3 from './img/3.png';
// import Pic_4 from './img/4.png';


@BasicLayout
@DialogHOC(<div className="dialogPic">
            <img src={require("./img/1.png")} alt=""/>
            <img src={require("./img/2.png")} alt=""/>
            <img src={require("./img/3.png")} alt=""/>
            <img src={require("./img/4.png")} alt=""/>
        </div>)
export default class SearchMap extends React.Component {

// 初始化绑定方法
    constructor(props){
        super(props)
        this.getPlan = this.getPlan.bind(this);
        this.getWays = this.getWays.bind(this);
        this.getExl = new ExportExl();
        this.state = {
            info:[],
        }
    }

// 回调点击提交后的表单数据并请求坐标&解决并发请求顺序问题
  async getPlan(param){
       //转化数据格式为{address:@param} 用来调用公用获取坐标方法
         const arrParam = Object.values(param).filter(fv=>!!fv).map(v=>({address:v}))
         //获取坐标
        await getLocation(arrParam,"toList").then(()=>{
             //获取上传表格信息
            let sLocation = sessionStorage.getItem('list') && JSON.parse(sessionStorage.getItem('list'))
            //获取目的地信息
            let eLocation = sessionStorage.getItem('toList') && JSON.parse(sessionStorage.getItem('toList'))
            let arr = []
            //循环遍历2个坐标点{start：出发地坐标点}，{end：目的地坐标点}
            for (let sv of sLocation){
                for(let ev of eLocation){
                    arr.push(Object.assign({start:sv},{end:ev}))
                }
            }
            console.log(arr)
            //并发处理所有请求
            return Promise.all(
                arr.map(av=>{
                    return new Promise((resovle)=>{
                        console.log(av)
                            resovle(this.getWays(av.start,av.end))
                        })
                })
            ).then(res=>{
                //将处理完成请求统一塞入state.info
                this.setState({
                    info: res,
                }) 
            })
         })
    }

// 请求路径方法，并返回路径&出发信息&目的地信息
    async getWays({...startLocation},{...endLoction}){
        const param = {
            key:gaodeOption.key,
            origin:startLocation.location,
            destination:endLoction.location,
            city:gaodeOption.city,
            cityd:gaodeOption.city,
            strategy:0,
            nightflag:0,
            date:gaodeOption.date,
            time:gaodeOption.time,
        }
       const res =  await queryWay(param)
      return (Object.assign({...res.data},{startLocation:startLocation,endLoction:endLoction}))
    }

    render(){
        console.log(this)
        let data =[]
        let keys = 0
        const TabPane = Tabs.TabPane;
        //处理渲染
        !!this.state.info.length && this.state.info.map((v,k)=>{
            keys++;
            return data.push({
                key: keys,
                name:v.startLocation.name,
                startAddress:v.startLocation.address,
                endAddress:v.endLoction.address,
                distance: v.route.transits.length && v.route.transits[0].distance,
                changeTime:v.route.transits.length && v.route.transits[0].segments.length,
                cost: v.route.transits.length && v.route.transits[0].cost,
                time: v.route.transits.length && v.route.transits[0].duration
            })
        })


        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="Step 1" key="1"><UploadFile disable={false} />{this.props.dialog}</TabPane>
                <TabPane tab="Step 2" key="2"> <WrappedHorizontalLoginForm handleFun={this.getPlan} /></TabPane>
                <TabPane tab="Step 3" key="3"> 
                    <Table pagination={false} columns={tableConfig} dataSource={data} />
                    <Button type="primary" shape="circle" onClick = { this.getExl.getExl.bind(this,"表格") } icon="download" />
                </TabPane>
            </Tabs>
        )
    }
}

