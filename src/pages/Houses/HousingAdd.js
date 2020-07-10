import React, { Component } from 'react'
import { Form, Input, Button,  Upload, message,Switch } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// 表单
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};



const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
};
// 上传图片
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

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

class HousingAdd extends Component {
    constructor(){
      super()
      this.state={
        data:null,
        imageUrl:'',
        loading: false,
        switch:true
      }
    }
    // 开关
    onChange(checked) {
      this.setState({
        switch:checked
      })
    }
    componentWillMount(){
      // console.log(this.props.location.state)
      if(this.props.location.state.data){
        this.setState({
          data:this.props.location.state.data.data,
          imageUrl:this.props.location.state.data.data.housingImg
        })
      }
     
    }
    onFinish (values) {
        let obj=values
        obj.housingImg=this.state.imageUrl
        obj.mainHousing=this.state.switch
        
      if(this.props.location.state.data){
        obj.id=this.props.location.state.data.data.id
        obj.estateId=this.props.location.state.data.id
        // console.log(obj)
        this.$axios.put(this.$api.housing.compile,obj)
        .then(res=>{
          // console.log(res)
          message.success("修改"+res.data.msg);
          this.props.history.go(-1)
        })
      }else{
        // console.log(obj)
        obj.estateId=this.props.location.state.id
        this.$axios.post(this.$api.housing.add,obj)
        .then(res=>{
          message.success("添加"+res.data.msg);
          this.props.history.go(-1)
        })
      }
    };
    handleChange = info => {
      // console.log(info)
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl:info.file.response.data.fileDownloadUri,
            loading: false,
          })
        );
      }
    };
    render() {
        let  product= this.state.data ||{}
        const uploadButton = (
          <div>
            {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        const { imageUrl } = this.state;
        let token=("Bearer "+localStorage.getItem("elementToken"))
        return (
           <>
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
                  label="建筑面积"
                  name="area"
                  initialValue={product.area}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="楼层"
                  name="floors"
                  initialValue={product.floors}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="户型图"
                  name="housingImg"
                  initialValue={product.housingImg}
                >
                  <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={this.$api.upload}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    headers={{Authorization:token}}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="户型介绍"
                  name="housingIntroduction"
                  initialValue={product.housingIntroduction}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="户型"
                  name="housingType"
                  initialValue={product.housingType}
                >
                <Input />
                </Form.Item>
                <Form.Item
                  label="是否是主打户型"
                  name="mainHousing"
                  initialValue={product.mainHousing}
                >
                  <Switch defaultChecked onChange={this.onChange.bind(this)} />
                </Form.Item>
        
       
        
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                </Form.Item>
            </Form>
           </>
        )
    }
}

export default HousingAdd
