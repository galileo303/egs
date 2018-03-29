import React from 'react';
import { Modal, Button } from 'antd';

const DialogHOC = content => Comp => class extends Comp{

    constructor(props){
        super(props)
    }

    state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }



  render() {

    console.log(content)
    const Dialog = (
        <div>
        <Button type="primary" onClick={this.showModal}>使用说明</Button>
        <Modal title="使用说明" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          {content}

        </Modal>
      </div>
    )
    return (
        <Comp {...this.props} dialog={Dialog} />
    );
  }



}


export default DialogHOC