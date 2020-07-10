import React, { Component } from 'react'
import{Card,Form,Input,Upload, message,Button,Menu,Dropdown} from 'antd'
import { LoadingOutlined, PlusOutlined ,DownOutlined} from '@ant-design/icons';
// 轮播图添加编辑

// 表单
// 文本框占的宽度
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
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

export default class Detail extends Component{
  constructor(props){
    super()
    this.state={
      loading:false,
      status:"",
      statusc:"请选择",
      type:"",
      typec:"请选择",
      form:{
        title:'',
        type:'',
        status:'',
        platform:'',
        positionCode:'',
        targetUrl:'',
        resourcePath:'',
      }
    }
   
  }
  componentWillMount(){
    // console.log(this.props.location.state)
    let statusc=""
    let typec=""
    if(this.props.location.state){
      if(this.props.location.state.status==1){
        statusc="正常"
      }else if(this.props.location.state.status==2){
        statusc="已下架"
      }else if(this.props.location.state.status==3){
        statusc="待上架"
      }else{
        statusc="删除"
      }
      if(this.props.location.state.type==1){
        typec="常规"
      }else{
        typec="定时"
      }
      this.setState({
        form:(this.props.location.state),
        statusc:statusc,
        typec:typec
      })
    }
    this.batchMenu=(
      <Menu onClick={this.batchGetMenuClick.bind(this)}>
      <Menu.Item key="1">正常</Menu.Item>
      <Menu.Item key="2" >已下架</Menu.Item>
      <Menu.Item key="3" >待上架</Menu.Item>
      <Menu.Item key="4">删除 </Menu.Item>
    </Menu>
    )
    this.menu=(
      <Menu onClick={this.menuClick.bind(this)}>
      <Menu.Item key="1">常规</Menu.Item>
      <Menu.Item key="2" >定时</Menu.Item>
    </Menu>
    )
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
  batchGetMenuClick(e) {
    let statusc=e.key
    if(e.key==1){
      statusc="正常"
    }else if(e.key==2){
      statusc="已下架"
    }else if(e.key==3){
      statusc="待上架"
    }else{
      statusc="删除"
    }
    this.setState({
      status:e.key,
      statusc:statusc
    })
  }
  menuClick(e){
    let typec=''
    if(e.key==1){
      typec="常规"
    }else{
      typec="定时"
    }
    this.setState({
      type:e.key,
      typec:typec
    })
  }
  // 提交表单且数据验证成功后回调事件
  onFinish(values){
    values.status=Number(this.state.status)
    values.type=Number(this.state.type)
    if(this.props.location.state){
      if(values.resourcePath){
        values.resourcePath =values.resourcePath.file.response.data.fileDownloadUri
      }else{
        values.resourcePath =this.props.location.state.resourcePath
      }
      if(!values.status){
        values.status=this.props.location.state.status
      }
      if(!values.type){
        values.type=this.props.location.state.type
      }
      // console.log(values)
      values.id=this.props.location.state.id
      let url=this.$api.banner.update
      this.$axios.put(url,values)
      .then(res=>{
        if((res.data.msg)==="成功"){
          this.props.history.go(-1)
          message.success("修改"+res.data.msg);
        }else{
          message.error('修改失败');
        }
      })
    }else{
      let url=this.$api.banner.add
      values.resourcePath =values.resourcePath.file.response.data.fileDownloadUri
      // console.log(values)
      this.$axios.post(url,values)
      .then(res=>{
        if((res.data.msg)==="成功"){
          
          this.props.history.go(-1)
          message.success("添加"+res.data.msg);
        }else{
          message.error('添加失败');
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
    let token=("Bearer "+localStorage.getItem("elementToken"))
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
              headers={{Authorization:token}}
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
            <Dropdown overlay={this.menu}>
              <Button>
                {this.state.typec}<DownOutlined />
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item
            label="状态"
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