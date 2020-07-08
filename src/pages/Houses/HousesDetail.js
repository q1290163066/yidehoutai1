import React, { Component } from 'react'
import { List , Divider,Tag ,Table, Card } from 'antd';
const { Column, ColumnGroup } = Table;


const dataa = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default class HousesDetail extends Component{
  constructor(){
    super()
    this.state={
      list:{}
    }
  }
  componentWillMount(){
    let id =(this.props.history.location.state)
    console.log(id)
    let url=this.$api.housesInfo.details+id
    this.$axios.get(url)
    .then(res=>{
      // console.log(res.data.data)
      this.setState({
        list:res.data.data
      })
    })
  }
  render(){
    let data=(this.state.list)
    let projectInfo=new Object(data.projectInfo)
    return(
      
        <div style={{paddingLeft:"100px"}}>
          <Card title="基本信息" bordered={true}>
            <List>楼盘ID ： {data.id}</List>
            <List>楼盘名称 ：  {data.name} </List>
            <List>楼盘城市： {data.city} </List>
            <List>楼盘地址： {data.address} </List>
            <List>楼盘定位 ：  {data.location} </List>
            <List>优惠信息：  {data.discountInfo}</List>
            <List>佣金规则： {data.commissionRule}</List>
            <List>邀约奖励 ： {data.inviteRewardRule}</List>  
            <List>售价 ：  {data.salePrice} </List>
            <List
              style={{display:"flex"}}
              header={<div>楼盘标签 ： </div>}
              dataSource={data.tags}
              renderItem={item => (
                  <Tag color="green" style={{marginTop:"12px"}}>{item}</Tag>
              )}
          /> 
            <List>联系电话 ：  {data.telephone}</List>
          </Card>
          <Card title="详情页滚动相册" bordered={true}>
            <List
              dataSource={data.photoImageList}
              renderItem={item => (
                  <img src={item} style={{width:"150px",height:"75px"}} alt="无法显示" />
              )}
            /> 
          </Card>
          <Card title="楼盘主推户型" bordered={true}>
            <Table dataSource={data.estateHousingList}>
                <Column title="标题" dataIndex="title" key="title" />
                <Column title="户型面积" dataIndex="area" key="area" />
                <Column title="楼层" dataIndex="floors" key="floors" />
                <Column title="户型图" dataIndex="housingImg" key="housingImg" 
                  render={housingImg=>(
                    <img src={housingImg} style={{width:"150px",height:"75px"}} alt="无法显示" />
                  )}
                />
                <Column title="户型" dataIndex="housingType" key="housingType" />
                <Column title="户型介绍：" dataIndex="housingIntroduction" key="housingIntroduction" />
                <Column title="是否是主打户型" dataIndex="mainHousing" key="mainHousing"
                  render={mainHousing=>(
                    mainHousing?"是":"否"
                  )}
                />
            </Table>
          </Card>
          <Card title="楼盘相册" bordered={true}>
            <List
              dataSource={data.photosList}
              renderItem={item => (
                  <div>
                    <div>{item.title}</div>
                    <img src={item} style={{width:"150px",height:"75px"}} alt="无法显示" />
                  </div>
              )}
            /> 
          </Card>
          <Card title="项目资料" bordered={true}>
            <List>开盘日期 ：  {projectInfo.openDate} </List>
            <List>交房日期 ：  {projectInfo.deliverDate} </List>
            <List>产品类型 ：  {projectInfo.type} </List>
            <List>产权 ：  {projectInfo.property} </List>
            <List>物业公司 ：  {projectInfo.propertyCompany} </List>
            <List>买卖面积区间 ：  {projectInfo.areaInterval} </List>
            <List>户型区间 ：  {projectInfo.housingInterval} </List>
            <List>项目介绍 ：  {projectInfo.projectIntroduce} </List>
            <List>项目配套 ：  {projectInfo.projectMatching} </List>
            <List>项目商业 ：  {projectInfo.projectBusiness} </List>
          </Card>

          {/* <Table dataSource={data.projectInfo}  title={() => '项目资料 ：'}>
              <Column title="开盘日期" dataIndex="openDate" key="openDate" />
              <Column title="交房日期" dataIndex="deliverDate" key="deliverDate" />
              <Column title="产品类型" dataIndex="type" key="type" />
              <Column title="产权" dataIndex="property" key="property" />
              <Column title="物业公司" dataIndex="propertyCompany" key="propertyCompany" />
              <Column title="买卖面积区间" dataIndex="areaInterval" key="areaInterval"/>
              <Column title="户型区间" dataIndex="housingInterval" key="housingInterval"/>
              <Column title="项目介绍" dataIndex="projectIntroduce" key="projectIntroduce"/>
              <Column title="项目配套" dataIndex="projectMatching" key="projectMatching"/>
              <Column title="项目商业" dataIndex="projectBusiness" key="projectBusiness"/>
          </Table> */}

      
         
          
         
        </div>
    )
  }
}