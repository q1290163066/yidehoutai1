
import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';


class HousingPhoto extends Component {
    constructor(){
      super()
      this.state={
        photosList:{}
      }
    }
    onFinish (values) {
      let obj=values
      
      // console.log(obj);
      if(this.props.location.state.data){
        let id=(this.props.location.state.data.id)
        // console.log(obj)
        let url=this.$api.photos.compile+id+"?title="+obj.title
        this.$axios.patch(url)
        .then(res=>{
          if(res.data.msg==="成功"){
            message.success("修改"+res.data.msg);
            this.props.history.go(-1)
          }
        })
        
      }else{
        obj.estateId=(this.props.location.state.id)
        this.$axios.post(this.$api.photos.add,obj)
        .then(res=>{
          if(res.data.msg==="成功"){
            message.success("添加"+res.data.msg);
            this.props.history.go(-1)
          }
        })
      }
    };
    componentWillMount(){
      if(this.props.location.state.data){
        // console.log(this.props.location.state.data)
        this.setState({
          photosList:this.props.location.state.data
        })
      }
    }
    render() {
        let photosList=this.state.photosList ||{}
        return (
          <div style={{padding:"25%", textAlign:"center"}}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish.bind(this)}
              >
                <Form.Item
                  name="title"
                  label="相册标题"
                  initialValue={photosList.title}
                >
                  <Input  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    提交
                  </Button>
                  <Button type="primary" style={{'marginLeft':'20px'}} onClick={()=>this.props.history.go(-1)}>返回</Button>
                </Form.Item>
              </Form>
          </div>
        )
    }
}

export default HousingPhoto
