import React, { Component } from 'react'
// 楼盘基本信息添加
import NationwideSelect from '../../common/js/nationwideSelect'
import{Card,Form,Input,Button,Upload,message,Tag,Menu,Dropdown } from 'antd'
import { LoadingOutlined, PlusOutlined,DownOutlined } from '@ant-design/icons';
import Gmap from '../../common/js/Gmap'


// 表单
// 文本框占的宽度
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// 提交表单且数据验证失败后回调事件
const onFinishFailed = errorInfo => {
  // console.log('Failed:', errorInfo);
};
// 上传
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 详情
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
let arr=[]

export default class Detail extends Component{
  constructor(props){
    super()
    // console.log(props)
    this.state={
      loading:false,
      city:'',
      form:{
        name:'',
        masterImg:'',
        address:'',
        city:''
      },
      tags:'',
      tag:[],
      location:'',
      status:"",
      statusc:"请选择"
    }
   
  }
  componentWillMount(){
  //  console.log(this.props.location.state.data)
   
   if(this.props.location.state){
    let statusc=""
    let status=this.props.location.state.data.status
    if(status=="NORMAL"){
       statusc="正常"
     }else if(status=="WAIT_RELEASE"){
       statusc="待发布"
     }else{
       statusc="已删除"
     }
    this.setState({
      form:this.props.location.state.data,
      tag:this.props.location.state.data.tags,
      statusc:statusc
    })
    arr=this.props.location.state.data.tags
   }
    this.batchMenu=(
      <Menu onClick={this.batchGetMenuClick.bind(this)}>
      <Menu.Item key="NORMAL">正常</Menu.Item>
      <Menu.Item key="WAIT_RELEASE" >待发布</Menu.Item>
      <Menu.Item key="DELETED">已删除 </Menu.Item>
    </Menu>
    )
  }
  batchGetMenuClick(e) {
    let statusc=e.key
    console.log(statusc)
    if(e.key=="NORMAL"){
      statusc="正常"
    }else if(e.key=="WAIT_RELEASE"){
      statusc="待发布"
    }else{
      statusc="已删除"
    }
    this.setState({
      status:e.key,
      statusc:statusc
    })
  }
  // 提交表单且数据验证成功后回调事件
  onFinish(values){
    let obj=values
      obj.city=this.state.city
      obj.tags=this.state.tag
      obj.location=this.state.location
      if(values.masterImg && values.masterImg.file) {
        obj.masterImg=values.masterImg.file.response.data.fileDownloadUri
      }
      values.status=this.state.status
      // console.log(this.props.location.state)
    if(this.props.location.state){
      // console.log(11)
      values.id=this.props.location.state.data.id
      if(!values.location) values.location=this.props.location.state.data.location
      if(!values.city) values.city=this.props.location.state.data.city
      let url=this.$api.housesInfo.compile_all
      // console.log(values)
      this.$axios.put(url,values)
      .then(res=>{
        if(res.status===200){
          this.props.history.go(-1)
          message.success("修改"+res.data.msg);
        }else{
          message.error('修改失败');
        }
        // console.log(res)
      })
    }else{
      
      
      // console.log(values)
      let url=this.$api.housesInfo.add
      this.$axios.post(url,obj)
      .then(res=>{
        if(res.status===200){
          this.props.history.go(-1)
          message.success("添加"+res.data.msg);
        }else{
          message.error('添加失败');
        }
      })
    }
   
  }
  fn(val){
    this.setState({
      city:val
    })
  }
  handleChange = info => {
    // console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, masterImg =>
        this.setState({
          form:{
            masterImg:info.file.response.data.fileDownloadUri
          },
          loading: false,
        })
      );
    }
  }
  addTag(){
    if(this.state.tags){
      let tags=this.state.tags
      arr.push(tags)
      this.setState({
        tags:'',
        tag:arr
      })
    }
  }
  change(e){
    this.setState({
      tags:e.target.value
    })
  }
  fn1(val){
    let arr=[]
    let longitude=val.lnglat.lat
    let latitude=val.lnglat.lng
    arr.push(longitude)
    arr.push(latitude)
    this.setState({
      location:String(arr)
    })
  }
  status(status){
    if(status==="NORMAL"){
      return "1"
    }else if(status==="WAIT_RELEASE"){
      return "2"
    }else{
      return "3"
    }
  }
  render(){
    let token=("Bearer "+localStorage.getItem("elementToken"))
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">选择图片</div>
      </div>
    )
    const  product= this.state.form
    // console.log(product)
    return(
      
      <Card  style={{padding:'40px'}}>
        
        <Form
          {...layout}
          name="basic"
          onFinish={this.onFinish.bind(this)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="楼盘名称"
            name="name"
            initialValue={product.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="楼盘主图"
            name="masterImg"
            initialValue={product.masterImg}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action= {this.$api.upload}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              headers={{Authorization:token}}
            >
              {product.masterImg ? <img src={product.masterImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          
          <Form.Item
            label="楼盘所属城市"
            name="city"
            initialValue={product.city}
          >
            <NationwideSelect fn={this.fn.bind(this)}></NationwideSelect>
          </Form.Item>
          
          <Form.Item
            label="楼盘详细地址"
            name="address"
            initialValue={product.address}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="楼盘定位"
            name="location"
            initialValue={product.location}
          >
            <Gmap fn1={this.fn1.bind(this)}></Gmap>
          </Form.Item>

          <Form.Item
            label="销售价格"
            name="salePrice"
            initialValue={product.salePrice}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="楼盘标签"
            name="tags"
          >
            <Input value={this.state.tags} onChange={this.change.bind(this)} />
            <Button type="primary" onClick={this.addTag.bind(this)}>添加标签</Button>
            <div>
              {
                this.state.tag.map((item,index)=>{
                  return (<Tag color="green" closable='true' key={index}>{item}</Tag>)
                })
              }
            </div>
          </Form.Item>

          <Form.Item
            label="佣金比例"
            name="commissionRisen"
            initialValue={product.commissionRisen}
          >
            <Input placeholder="例如:5.6"/>
          </Form.Item>
          <Form.Item
            label="佣金规则描述"
            name="commissionRule"
            initialValue={product.commissionRule}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邀约奖励"
            name="inviteReward"
            initialValue={product.inviteReward}
          >
            <Input placeholder="例如:5.6"/>
          </Form.Item>
          
          <Form.Item
            label="邀约奖励描述"
            name="inviteRewardRule"
            initialValue={product.inviteRewardRule}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="优惠信息"
            name="discountInfo"
            initialValue={product.discountInfo}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="联系电话"
            name="telephone"
            initialValue={product.telephone}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="楼盘状态"
            name="status"
            initialValue={product.status}
          >
            
            <Dropdown overlay={this.batchMenu}>
              <Button>
                {this.state.statusc}<DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button type="primary" style={{'marginLeft':'20px'}} onClick={()=>this.props.history.go(-1)}>返回</Button>
          </Form.Item>
        </Form>
      </Card>

    )
  }
}