import React, { Component } from 'react'
import './Banner.styl'
import { Card,Button,Space,Table,message,Pagination } from 'antd'
// 轮播图列表
// 添加和更新
export default class Houses extends Component{
  constructor(){
    super()
    this.state={
      products:[]//轮播图数组
    }
  }
  componentWillMount(){
    this.initColumns()
    this.$axios.get(this.$api.banner.get_all)
    .then(res=>{
      // console.log(res.data.data)
      this.setState({
        products:res.data.data
      })
    })
  }
  // 初始化table的列的数组
  initColumns(){
    this.columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '图片',
        key: 'resourcePath',
        dataIndex:'resourcePath',
        render:(resourcePath) => (
          <img src={resourcePath} alt="加载失败" className="img"/>
        )
      },
      {
        title: '平台',
        key: 'platform',
        dataIndex:'platform'
      },
      {
        title: '位置编码',
        key: 'positionCode',
        dataIndex:'positionCode'
      },
      {
        title: '状态',
        key: 'status',
        dataIndex:'status',
        width:100,
        render:(status) => (
          <span>
            {/* <Button type='primary'>下架</Button> */}
            <span>使用中</span>
          </span>
        )
      },
      {
        title: '操作',
        width:100,
        render:(product) => (
          <Space size="middle">
            <Button type="link" onClick={()=>this.props.history.push('banner/detail',product)}>编辑/详情</Button>
            <Button type="link" onClick={this.delete.bind(this,product)}>删除</Button>
        </Space>
        )
      }
    ];
  }
  // 删除
  delete(product){
    // console.log(product.id)
    this.$axios.delete(this.$api.banner.delete+product.id)
    .then(res=>{
      // console.log(res)
      this.$axios.get(this.$api.banner.get_all)
      .then(res=>{
        // console.log(res.data.data)
        if(res.data.msg=="成功"){
          this.setState({
            products:res.data.data
          })
          message.success("删除"+res.data.msg);
        }else{
          message.error('删除失败');
        }
        
      })
    })
  }
  skip(page, pageSize){
    // console.log(page)
  }
  render(){
    const {products}=this.state
    const extra=(
      <Button type='promary' onClick={()=>this.props.history.push('banner/detail')}>
        添加
      </Button>
    )

    return(
      <Card extra={extra}>
        <Table 
          bordered
          dataSource={products}
          columns={this.columns}
          rowKey='id'
          pagination={false}
        />
        {/* <Pagination defaultCurrent={1} total={products.length} onChange={this.skip.bind(this)} /> */}
      </Card>
    )
  }
}