import React from 'react';
import { Upload, Icon, message } from 'antd';
import { getLocation } from '../../util/getLocation.core.js'

const Dragger = Upload.Dragger;
export default class UploadFile extends React.Component{

    

    render(){

       const file = {
        name: 'file',
        multiple: false,
        showUploadList: false,
           action: 'http://10.110.1.116:8080/webapi/upload',
        onChange(info) {
            const status = info.file.status;
            if (status !== 'uploading') {
                console.log(info.file.response);

                getLocation(info.file.response,"list")
                
                
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

        return(
            <div style={{ marginTop: 16, height: 180 }}>
                <Dragger {...file}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">拖拽/点击上传Excel</p>
                    <p className="ant-upload-hint">上传您需要对应查询的地址的Excel表格</p>
                </Dragger>
            </div>
        )
    }


}

