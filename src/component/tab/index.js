import React from 'react';
import { Tabs } from 'antd';


const TabHOC = ({children}) => class extends React.Component {
    constructor(props){
        super(props)
        
    }

    
    render(){
        const TabPane = Tabs.TabPane;
        const tabItem  = !!children.length && children.map((v,k)=>{
            return <TabPane disabled={v.comp.props.disable} tab={`Step ${k+1}`} key={k}>{v.comp}</TabPane>
        })          
        return(
             <Tabs defaultActiveKey="0">
                {tabItem}
            </Tabs>
        )
    }
} 

export default TabHOC