import React, { Component } from 'react'
import { Form, Input, Button,DatePicker,message  } from 'antd';

// 表单
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};


class Project extends Component {
    // componentWillMount(){
    //   this.$axios
    // }
    // 提交表单
    constructor(){
      super()
      this.state={
        openDate:'',
        deliverDate:"",
        data:{}
      }
    }
    onFinish (values) {
      console.log('Success:', values);
      console.log(this.props.location.state.data.data)
     if(this.props.location.state.data.data){

     }else{
        let obj=values
        obj.openDate=this.state.openDate
        obj.deliverDate=this.state.deliverDate
        obj.estateId=this.props.location.state.id
        console.log(obj)
        // console.log(this.props.location.state)
        this.$axios.post(this.$api.project.add,obj)
        .then(res=>{
          message.success("添加"+res.data.msg);
          this.props.history.go(-1)
        })
     }
      // console.log(this.state.openDate)
    };
    // 日期选择器
    openDate(date, dateString) {
      // console.log(date, dateString);
      this.setState({
        openDate:dateString
      })
    }
    deliverDate(date, dateString) {
      // console.log(date, dateString);
      this.setState({
        deliverDate:dateString
      })
    }
    componentWillMount(){
      console.log(this.props.location.state.data)
      this.setState({
        data:this.props.location.state.data
      })
    }
    render() {
      let data=this.state.data
        return (
          <Form
            {...layout}
            name="basic"
            onFinish={this.onFinish.bind(this)}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="买卖面积区间"
              name="areaInterval"
              initialValue={data.areaInterval}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="房屋交付日期"
              name="deliverDate"
              // initialValue={data.deliverDate}
            >
              <DatePicker onChange={this.deliverDate.bind(this)} />
            </Form.Item>
            <Form.Item
              label="	户型区间"
              name="housingInterval"
              initialValue={data.housingInterval}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="	开盘日期"
              name="openDate"
              // initialValue={data.openDate}
            >
               <DatePicker onChange={this.openDate.bind(this)} />
            </Form.Item>
            <Form.Item
              label="项目商业"
              name="projectBusiness"
              initialValue={data.projectBusiness}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="项目介绍"
              name="projectIntroduce"
              initialValue={data.projectIntroduce}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="	项目配套"
              name="projectMatching"
              initialValue={data.projectMatching}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="产权"
              name="property"
              initialValue={data.property}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="物业公司"
              name="propertyCompany"
              initialValue={data.propertyCompany}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="产品类型，以/分割"
              name="type"
              initialValue={data.type}
            >
              <Input />
            </Form.Item>
           
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button type="primary" style={{'marginLeft':'20px'}} onClick={()=>this.props.history.go(-1)}>返回</Button>
            </Form.Item>
          </Form>
        )
    }
}

export default Project
