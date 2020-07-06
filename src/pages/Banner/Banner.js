import React, { Component } from 'react'
import './Banner.styl'
import { Card,Button,Space,Table} from 'antd'

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
        title: '状态',
        key: 'status',
        dataIndex:'status',
        width:100,
        render:(status) => (
          <span>
            <Button type='primary'>下架</Button>
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
    console.log(product.id)
    this.$axios.delete(this.$api.banner.delete+product.id)
    .then(res=>{
      console.log(res)
      this.$axios.get(this.$api.banner.get_all)
      .then(res=>{
        // console.log(res.data.data)
        this.setState({
          products:res.data.data
        })
      })
    })
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
        />
      </Card>
    )
  }
}