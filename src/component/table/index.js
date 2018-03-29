import React from 'react';
import { Table, Icon } from 'antd';

const columns = [{
    title: '起点',
    dataIndex: 'startAddress',
    key: 'startAddress',
}, {
    title: '目的地',
    dataIndex: 'endAddress',
        key: 'endAddress',
}, {
        title: '起点和终点的步行距离',
        dataIndex: 'distance',
        key: 'distance',
}, {
    title: '公交线路',
    key: 'bus',

    }, {
        title: '费用',
        dataIndex: 'cost',
        key: 'cost',
    }, {
        title: '预计时间',
        dataIndex: 'time',
        key: 'time',
    }];

const data = [{
    key: '1',
    startAddress: '浦东',
    endAddress: 32,
    distance: 'New York No. 1 Lake Park',
    bus: 'New York No. 1 Lake Park',
    cost: 'New York No. 1 Lake Park',
    time:"53分钟"
}, {
        key: '2',
        startAddress: '浦东',
        endAddress: 32,
        distance: 'New York No. 1 Lake Park',
        bus: 'New York No. 1 Lake Park',
        cost: 'New York No. 1 Lake Park',
        time: "53分钟"
    }, {
        key: '3',
        startAddress: '浦东',
        endAddress: 32,
        distance: 'New York No. 1 Lake Park',
        bus: 'New York No. 1 Lake Park',
        cost: 'New York No. 1 Lake Park',
        time: "53分钟"
    }, 

];



export default class TableComp extends React.Component{

    constructor(props){
        super(props)
        
    }

    componentWillReceiveProps(nextProps){
        console.log(this)
        console.log(nextProps)
    }


    render(){
        
        console.log(this)
        return(
            <Table columns={columns} dataSource={data} />
        )
    }
}

