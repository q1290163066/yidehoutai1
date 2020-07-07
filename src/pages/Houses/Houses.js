import React, { Component } from 'react'
import './Houses.styl'
import { Card,Button,Form,Input,Table,Tag,DatePicker } from 'antd'


// 文本框占的宽度
const layout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 1, span: 5 },
};
// 提交表单且数据验证失败后回调事件
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const onChange=(val)=>{
  console.log(val)
}

export default class Houses extends Component{

  onFinish(values){
    // let obj=values
    // obj.city=this.state.city
    // obj.tags=this.state.tag
    // obj.location=this.state.location
    // if(values.masterImg) obj.masterImg=values.masterImg.file.response.data.fileDownloadUri
    
    // console.log(obj)
    // let url=this.$api.housesInfo.add
    // this.$axios.post(url,obj)
    // .then(res=>{
    //   console.log(res)
    // })
   console.log(values)
  }

  constructor(){
    super()
    this.state={
      products:[]//数组
    }
  }
  componentWillMount(){
    this.initColumns()
    this.$axios.get(this.$api.housesInfo.get_all)
    .then(res=>{
      console.log(res.data.data.list)
      this.setState({
        products:res.data.data.list
      })
    })

  }
  status(status){
    if(status==="NORMAL"){
      return "正常"
    }else if(status==="WAIT_RELEASE"){
      return "待发布"
    }else{
      return "已删除"
    }
  }
  initColumns(){
    this.columns = [
      {
        title: '图片',
        key: 'masterImg',
        dataIndex:'masterImg',
        render:(resourcePath) => (
          <img src={resourcePath} alt="加载失败" className="img"/>
        )
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      
      {
        title: '售价',
        dataIndex: 'salePrice',
        key: 'salePrice',
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render:(tags) => (
              <div>
                {
                  tags.map((item,index)=>{
                      return (<Tag color="green" key={index} style={{marginTop:"5px"}}>{item}</Tag>)
                  })
                }
              </div>
        )   
      },
      {
        title: '联系电话',
        dataIndex: 'telephone',
        key: 'telephone',
      },
      {
        title: '佣金',
        dataIndex: 'commissionRisen',
        key: 'commissionRisen',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(status) => (
              <div>
                {
                     this.status(status)
                }
              </div>
        )   
      },
      {
        title: '操作人',
        dataIndex: 'operationUserName',
        key: 'operationUserName',
      },
    
      {
        title: '操作时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
      }
     
    
    
     
     
    

    ];
  }
  render(){
    const {products}=this.state
    const extra=(
      <Button type='promary' onClick={()=>this.props.history.push('houses/detail')}>
        添加
      </Button>
    )
    const title=(
      <Form
      {...layout}
      name="basic"
      onFinish={this.onFinish.bind(this)}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="楼盘名称"
        name="name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="状态"
        name="status"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="城市"
        name="city"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="name"
      >
        <DatePicker onChange={onChange} />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">查询</Button>
      </Form.Item>
    </Form>
    )

    return(
      <Card extra={extra} title={title}>
      <Table 
        columns={this.columns}
        rowKey='id'
        dataSource={products}
      />
    </Card>
    )
  }
}