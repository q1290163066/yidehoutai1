import React, { Component } from 'react'
import { List , Tag ,Table, Card,Button,Space,message,Carousel  } from 'antd';
import './HousesDetail.styl'
const { Column } = Table;
// 楼盘基本信息详情


export default class HousesDetail extends Component{
  constructor(){
    super()
    this.state={
      list:{},
      photoImageList:[]
    }
  }
  componentWillMount(){
    let id =(this.props.history.location.state)
    // console.log(id)
    let url=this.$api.housesInfo.details+id
    this.$axios.get(url)
    .then(res=>{
      // console.log(res.data.data)
      this.setState({
        list:res.data.data,
        estateHousingList:res.data.data.estateHousingList,
        photosList:res.data.data.photosList,
        id:res.data.data.id
      },function(){
        let idUrl=this.$api.building.get+"?estateId="+this.state.id
        this.$axios.get(idUrl)
        .then(res=>{
          this.setState({
            photoImageList:res.data.data.list
          })
        })
      })
    })
   
  }
  toHousingadd(data){
    this.props.history.push('/index/houses/housingadd',{data})
  }
  del(id){
    // console.log(id)
    let arr=this.state.list.estateHousingList
    let index=arr.findIndex(item=>{
      return item.id==id
    })
    // console.log(index)
    let url=this.$api.housing.del_one+id
    // console.log(url)
    this.$axios.delete(url)
    .then(res=>{
      // console.log(res)
      if(res.data.msg==="成功"){
        arr.splice(index,1)
        this.setState({
          estateHousingList:[...arr]
        })
        message.success("删除"+res.data.msg);
      }else{
        message.error('删除失败');
      }
      

    })
  }
  delphotosList(id){
    // console.log(id)
    let url=this.$api.photos.del_one+id
    this.$axios.delete(url,id)
    .then(res=>{
      if(res.data.msg==="成功"){
        message.success("删除"+res.data.msg);
        let arr=this.state.photosList
        let index=arr.findIndex(item=>{
          return item.id===id
        })
        arr.splice(index,1)
        this.setState({
          photosList:[...arr]
        })
      }else{
        message.error('删除失败');
      }
    })
    
  }
  delphoto(id){
    // console.log(id)
    let url=this.$api.building.del_one+id
    this.$axios.delete(url)
    .then(res=>{
      if(res.data.msg==="成功"){
        let arr=this.state.photoImageList
        let index=arr.findIndex(item=>{
          return item.id===id
        })
        arr.splice(index,1)
        this.setState({
          photoImageList:[...arr]
        })
        message.success("删除"+res.data.msg);
      }else{
        message.error('删除失败');
      }
    })
  }
  render(){
    let data=(this.state.list)
    let projectInfo=new Object(data.projectInfo)
    let btn="添加"
    if(projectInfo){
      btn="编辑"
    }else{
      btn="添加"
    }
    let photoImageList=data.photoImageList || []

    const basic=(
      <Button type='primary' onClick={()=>this.props.history.push('/index/houses/add',{id:data.id,data:data})}>
        编辑
      </Button>
    )

    const housingExtra=(
      <Button type='primary' onClick={()=>this.props.history.push('/index/houses/housingadd',{id:data.id})}>
        添加
      </Button>
    )
    const projectExtra=(
      <Button type='primary' onClick={()=>this.props.history.push('/index/project',{id:data.id,data:projectInfo})}>
        {btn}
      </Button>
    )
    const photoExtra=(
      <Button type='primary' onClick={()=>this.props.history.push('/index/housingphoto',{id:data.id})}>
        添加
      </Button>
    )
    const photoListExtra=(
      <Button type='primary' onClick={()=>this.props.history.push('/index/housingphotoadd',{data:data})}>
        添加
      </Button>
    )
    return(
        <div style={{paddingLeft:"100px"}}>
          <Card title="基本信息" bordered={true} extra={basic}>
            <List>主图 ： <img src={data.masterImg} style={{width:"150px",height:"75px"}}/> </List>
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

          <Card title="项目资料" bordered={true} extra={projectExtra}>
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
          <Card title="楼盘主推户型" bordered={true} extra={housingExtra}>
            <Table dataSource={this.state.estateHousingList}>
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
                <Column title="操作"
                  render={data=>(
                    <Space size="middle">
                      <Button type="link" onClick={this.toHousingadd.bind(this,{data,id:this.state.list.id})}>详情/编辑</Button>
                      <Button type="danger" onClick={this.del.bind(this,data.id)}>删除</Button>
                    </Space>
                  )}
                />
                  
            </Table>
          </Card>
          <Card title="楼盘相册" bordered={true} extra={photoExtra} >
            <Table 
              dataSource={this.state.photosList}
            >
                <Column title="标题" dataIndex="title" key="title" />
                <Column title="图片列表" dataIndex="photoImageList" key="photoImageList" 
                  render={photoImageList=>(
                    <Carousel autoplay style={{width:"150px",height:"75px"}} dots={false}>
                      {
                        photoImageList.map((item,index)=>{
                          return (<div style={{width:"150px",height:"75px"}} key={index}><img src={item.imgUrl} alt="无法显示" style={{width:"150px",height:"75px"}}/></div>)
                        })
                      }
                    </Carousel>
                  )}
                />
                <Column title="操作"
                  render={photosList=>(
                    <Space size="middle">
                      <Button type="link" onClick={()=>this.props.history.push('/index/housingphoto',{data:photosList})}>编辑</Button>
                      <Button type="danger" onClick={this.delphotosList.bind(this,photosList.id)}>删除</Button>
                    </Space>
                  )}
                />
                  
            </Table>
          </Card>
        

          <Card title="楼盘相册图片" bordered={true} extra={photoListExtra}>
            <Table
             dataSource={this.state.photoImageList}
              
            >
                <Column title="所属相册标题" dataIndex="photoTitle" key="photoTitle" />
                <Column title="相册ID" dataIndex="photoId" key="photoId" />
                <Column title="图片名称" dataIndex="name" key="name" />
                <Column title="图片地址" dataIndex="imgUrl" key="imgUrl" 
                  render={imgUrl=>(
                    <img src={imgUrl} style={{width:"150px",height:"75px"}} alt="无法显示" />
                  )}
                />
                <Column title="是否首页展示" dataIndex="indexShow" key="indexShow"
                  render={indexShow=>(
                    indexShow?"是":"否"
                  )}
                />
                <Column title="操作"
                  render={data=>(
                    <Space size="middle">
                      <Button type="danger" onClick={this.delphoto.bind(this,data.id)}>删除</Button>
                    </Space>
                  )}
                />
                  
            </Table>
          </Card>
        </div>
    )
  }
}