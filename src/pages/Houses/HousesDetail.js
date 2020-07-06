import React, { Component } from 'react'

import NationwideSelect from '../../common/js/nationwideSelect'
import{Card,Form,Input,Button,Upload,message,Tag, Divider } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


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
  console.log('Failed:', errorInfo);
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

export default class Detail extends Component{
  constructor(props){
    super()
    console.log(props)
    this.state={
      loading:false,
      city:'',
      form:{
        name:'',
        masterImg:'',
        address:'',
        city:''
      },
      salePrice:'',
      tag:<Tag color="green" closable='true'>green</Tag>
    }
   
  }
  componentWillMount(){
   
  }
  // 提交表单且数据验证成功后回调事件
  onFinish(values){
    let obj=values
    obj.city=this.state.city
    obj.masterImg=values.masterImg.file.response.data.fileDownloadUri
    console.log(obj)
    console.log(window.event.nativeEvent)
   
  }
  fn(val){
    this.setState({
      city:val
    })
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, resourcePath =>
        this.setState({
          form:{
            resourcePath:info.file.response.data.fileDownloadUri
          },
          loading: false,
        })
      );
    }
  }
  addTag(){
    let salePrice=this.state.salePrice
    let tag=this.state.tag
    let tags=<Tag color="green" closable='true'>{salePrice}</Tag>+tag
    this.setState({
      tag:tags
    })
  }
  change(e){
    this.setState({
      salePrice:e.target.value
    })
  }
  render(){
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">选择图片</div>
      </div>
    )
    const  product= this.state.form
    return(
      
      <Card >
        
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
            label="楼盘主图"
            name="masterImg"
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action= {this.$api.upload}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {product.resourcePath ? <img src={product.resourcePath} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          
          <Form.Item
            label="楼盘详细地址"
            name="address"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="楼盘所属城市"
            name="city"
          >
            <NationwideSelect fn={this.fn.bind(this)}></NationwideSelect>
          </Form.Item>

          <Form.Item
            label="销售价格"
            name="salePrice"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="楼盘标签"
            name="salePrice"
          >
            <Input value={this.state.salePrice} onChange={this.change.bind(this)} />
            <Button type="primary" onClick={this.addTag.bind(this)}>添加标签</Button>
             <div id='tag'>{this.state.tag} </div>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            提交
            </Button>
            <Button type="primary" style={{'marginLeft':'20px'}} onClick={()=>this.props.history.go(-1)}>
            返回
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}