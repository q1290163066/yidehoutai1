import React, { Component } from 'react'
import './Houses.styl'
import { Card,Button,Form,Input,Table,Tag,message,Dropdown,Menu,Space,Pagination } from 'antd'
import { DownOutlined } from '@ant-design/icons';
// 楼盘基本信息列表

// 文本框占的宽度

const tailLayout = {
  wrapperCol: { offset: 1, span: 5 },
};
// 提交表单且数据验证失败后回调事件
const onFinishFailed = errorInfo => {
  // console.log('Failed:', errorInfo);
};


const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default class Houses extends Component{


  handleGetMenuClick(e) {
    // console.log('click', e);
    this.setState({
      status:e.key,
      select:e.item.props.children[1]
    })
  }
  batchGetMenuClick(e) {
    let status=e.key
    let arr=this.state.selectedRowKeys
    let url=this.$api.housesInfo.all_status+"?ids="+arr+"&status="+status
    this.$axios.patch(url)
    .then(res=>{
      if(res.data.msg==="成功"){
        let list=this.state.products
        list.forEach(item=>{
          arr.forEach(items=>{
            if(item.id===items){
              item.status=status
              this.setState({
                products:list
              })
            
            }
          })
        })
        message.success("修改"+res.data.msg);
      }else{
        message.error('修改失败');
      }
    })
  }
  modificationMenuClick(e){
    // console.log(e.key)
    let status=e.key
    let obj=this.state.record
    let id=obj.id
    let url=this.$api.housesInfo.compileOne+id+"?status="+status
    this.$axios.patch(url)
    .then(res=>{
      if(res.data.msg==="成功"){
        // console.log(res)
        obj.status=e.key
        this.setState({
          record:obj
        })
        message.success("修改"+res.data.msg);
      }else{
        message.error('修改失败');
      }
    })
  }

  onFinish(values){
    let obj=values
    obj.status=this.state.status
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
      select:"请选择",
      record:'',
      selectedRowKeys: [],
      batch:"批量修改状态",
      list:{},
      page:"1"
    }
  }
  start = () => {
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: []
      });
    }, 1000);
  };
  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  componentWillMount(){
    this.initColumns()
    // console.log(this.state.page)
    let url=this.$api.housesInfo.get_all+"?page.page="+this.state.page+"&page.size=10"
    this.$axios.get(url)
    .then(res=>{
      let list=res.data.data ||[]
      // console.log(list)
      this.setState({
        products:list.list,
        list:res.data.data
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
    this.batchMenu=(
      <Menu onClick={this.batchGetMenuClick.bind(this)}>
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
      // {
      //   title: '地址',
      //   dataIndex: 'address',
      //   key: 'address',
      //   width:150
      // },
      
      {
        title: '售价',
        dataIndex: 'salePrice',
        key: 'salePrice',
      },
      // {
      //   title: '标签',
      //   dataIndex: 'tags',
      //   key: 'tags',
      //   width:150,
      //   render:(tags) => (
      //         <div>
      //           {
      //             tags.map((item,index)=>{
      //                 return (<Tag color="green" key={index} style={{marginTop:"5px"}}>{item}</Tag>)
      //             })
      //           }
      //         </div>
      //   )   
      // },
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
                 <Dropdown overlay={this.modificationMenu} trigger={['click']}>
                  <Button>
                    {this.status(status)}<DownOutlined />
                  </Button>
                </Dropdown>
              </div>
        )   
      },
      // {
      //   title: '操作人',
      //   dataIndex: 'operationUserName',
      //   key: 'operationUserName',
      // },
    
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
            <Button type="link"  onClick={()=>this.props.history.push('/index/houses/detail',product.id)} style={{width:'20px'}}>详情/编辑</Button>
          </Space>
        )
      }
    ];
  }
  skip(page, pageSize){
    let url=this.$api.housesInfo.get_all+"?page.page="+page+"&page.size=1"
    // let obj={
    //   "page.page":this.state.page,
    //   "page.size":"1"
    // }
    this.$axios.get(url)
    .then(res=>{
      let list=res.data.data ||[]
      // console.log(list)
      this.setState({
        products:list.list,
        page:page
      })
    })
  }
  render(){
    const {products}=this.state
    console.log(this.state.list)
    const {selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const extra=(
      <Button type='primary' onClick={()=>this.props.history.push('houses/add')}>
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
      <Form.Item {...tailLayout}>
          <Dropdown overlay={this.batchMenu}>
            <Button>
              {this.state.batch} <DownOutlined />
            </Button>
          </Dropdown>
      </Form.Item>
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
        rowSelection={rowSelection}
        pagination={false}
        //这里是点击行的数据，可以把需要的数据存入state，然后在操作栏调用
        onRow = {(record) => {
          return {
              onClick: () => {
                 this.setState({
                    record
                 })
              }}
          }}
      />
      <Pagination style={{float:"right",marginTop:"10px"}} total={this.state.list.total} defaultCurrent={1} defaultPageSize={10} onChange={this.skip.bind(this)}/>
    </Card>
    )
  }
}