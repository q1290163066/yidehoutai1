import React, { Component } from 'react'
import{Card,Form,Input,Upload, message,Button } from 'antd'
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
    this.state={
      loading:false,
      form:{
        title:'',
        type:'',
        status:'',
        platform:'',
        positionCode:'',
        targetUrl:'',
        resourcePath:''
      }
    }
   
  }
  componentWillMount(){
    if(this.props.location.state){
      this.setState({
        form:(this.props.location.state)
      })
    }
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
  // 提交表单且数据验证成功后回调事件
  onFinish(values){
    // console.log(this)
    // console.log('Success:', values.resourcePath.file.response.data.fileDownloadUri);
    
    if(this.props.location.state){
      if(values.resourcePath){
        values.resourcePath =values.resourcePath.file.response.data.fileDownloadUri
      }else{
        values.resourcePath =this.props.location.state.resourcePath
      }
      console.log(values)
      values.id=this.props.location.state.id
      let url=this.$api.banner.update
      this.$axios.put(url,values)
      .then(res=>{
        if((res.data.msg)==="成功"){
          alert(res.data.msg)
          this.props.history.go(-1)
        }
      })
    }else{
      let url=this.$api.banner.add
      values.resourcePath =values.resourcePath.file.response.data.fileDownloadUri
      console.log(values)
      this.$axios.post(url,values)
      .then(res=>{
        if((res.data.msg)==="成功"){
          alert(res.data.msg)
          this.props.history.go(-1)
        }
      })
      // console.log(values)
    }
   
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
      <Card style={{padding:'40px'}}>
        
        <Form
          {...layout}
          name="basic"
          onFinish={this.onFinish.bind(this)}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="标题"
            name="title"
            initialValue={product.title}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="图片"
            name="resourcePath"
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
            label="平台"
            name="platform"
            initialValue={product.platform}
          >
            <Input placeholde="miniapp"/>
          </Form.Item>
          <Form.Item
            label="广告位置"
            name="positionCode"
            initialValue={product.positionCode}
          >
            <Input placeholder="请填写index-banner"/>
          </Form.Item>
          <Form.Item
            label="目标地址"
            name="targetUrl"
            initialValue={product.targetUrl}
          >
          <Input />
          </Form.Item>
          <Form.Item
            label="类型"
            name="type"
            initialValue={product.type}
          >
            <Input placeholder="请填写1"/>
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            initialValue={product.status}
          >
            <Input placeholder="请填写1"/>
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