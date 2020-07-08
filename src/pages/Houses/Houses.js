import React, { Component } from 'react'
import './Houses.styl'
import { Card,Button,Form,Input,Table,Tag,DatePicker,Dropdown,Menu,Space } from 'antd'
import { DownOutlined,UserOutlined } from '@ant-design/icons';


// 文本框占的宽度
const layout = {
  labelCol: { span: 2},
  wrapperCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 1, span: 5 },
};
// 提交表单且数据验证失败后回调事件
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};


// function handleButtonClick(e) {
//   message.info('Click on left button.');
//   console.log('click left button', e);
// }



export default class Houses extends Component{


  handleGetMenuClick(e) {
    // console.log('click', e);
    this.setState({
      status:e.key,
      select:e.item.props.children[1]
    })
  }
  modificationMenuClick(e){
    console.log(e)
    // console.log(this)
  }
  // onChange=(val)=>{
  //   // console.log(utils.formatTime(new Date(val)))
  //   this.setState({
  //     time:utils.formatTime(new Date(val))
  //   })
  // }
  onFinish(values){
    let obj=values
    obj.status=this.state.status
    // obj.time=this.state.time
    // console.log(obj)
    this.$axios({
      url:this.$api.housesInfo.get_all,
      params:obj
    }) .then(res=>{
      // console.log(res.data.data.list)
      this.setState({
        products:res.data.data.list
      })
    })
  }

  constructor(){
    super()
    this.state={
      products:[],//数组
      status:'',
      time:'',
      select:"请选择"
    }
  }
  modification(){
    this.setState({
      show:"block"
    })
  }
  componentWillMount(){
    this.initColumns()
    this.$axios.get(this.$api.housesInfo.get_all)
    .then(res=>{
      // console.log(res.data.data.list)
      this.setState({
        products:res.data.data.list
      })
    })
    this.getMenu = (
      <Menu onClick={this.handleGetMenuClick.bind(this)}>
        <Menu.Item key="NORMAL">正常</Menu.Item>
        <Menu.Item key="WAIT_RELEASE" >待发布</Menu.Item>
        <Menu.Item key="DELETED">已删除 </Menu.Item>
      </Menu>
    );
    this.modificationMenu=(
      <Menu onClick={this.modificationMenuClick.bind(this)}>
      <Menu.Item key="NORMAL">正常</Menu.Item>
      <Menu.Item key="WAIT_RELEASE" >待发布</Menu.Item>
      <Menu.Item key="DELETED">已删除 </Menu.Item>
    </Menu>
    )
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
        width:150
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
        width:150
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
        width:150,
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
        key: 'status',
        dataIndex: 'status',
        render:(status) => (
              <div style={{textAlign:"center"}}>
                 <Dropdown overlay={this.modificationMenu}>
                  <Button>
                    {this.status(status)}<DownOutlined />
                  </Button>
                </Dropdown>
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
      },
      {
        title: '操作',
        width:150,
        render:(product) => (
          <Space size="middle">
            <Button type="link"  onClick={()=>this.props.history.push('houses/detail',product.id)} style={{width:'20px'}}>详情</Button>
            <Button type="link" style={{width:'20px'}}>编辑</Button>
            <Button type="link"  style={{width:'20px'}}>删除</Button>
          </Space>
        )
      }
     
    
    
     
     
    

    ];
  }
  render(){
    const {products}=this.state
    const extra=(
      <Button type='promary' onClick={()=>this.props.history.push('houses/add')}>
        添加
      </Button>
    )
    const title=(
      <Form
      layout="inline"
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
        label="城市"
        name="city"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="状态"
        name="status"
      >
          <Dropdown overlay={this.getMenu}>
            <Button>
              {this.state.select} <DownOutlined />
            </Button>
          </Dropdown>
      </Form.Item>

      {/* <Form.Item
        label="开始时间"
        name="startTime"
      >
        <DatePicker onChange={this.onChange.bind(this)} />
      </Form.Item> */}


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