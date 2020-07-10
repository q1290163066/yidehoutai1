
import React, { Component } from 'react'
import { Form, Input, Button,message, Menu, Dropdown,Upload ,Switch } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// 表单
// 文本框占的宽度
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};
// 上传
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

class HousingPhotoAdd extends Component {
    constructor(){
        super()
        this.state={
            data:{},
            loading: false,
            imgUrl:"",
            select:"请选择",
            id:""
        }
    }
    componentWillMount(){
        // console.log(this.props.location.state.data)
        this.setState({
            data:this.props.location.state.data
        })
    }
    onFinish (values) {
       values.imgUrl=values.imgUrl.file.response.data.fileDownloadUri
       values.estatePhotosId=this.state.id
      //  console.log(values)
       this.$axios.post(this.$api.building.add,values)
       .then(res=>{
           if(res.data.msg==="成功"){
              this.props.history.go(-1)
              message.success("添加"+res.data.msg);
            }else{
              message.error('添加失败');
            }
       })
    };
    handleChange (info) {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imgUrl:imageUrl,
              loading: false,
            }),
          );
        }
    }
    onChange(checked) {
        // console.log(`switch to ${checked}`);
        this.setState({
          show:checked
        })
    }
    change  ({key})  {
        this.setState({
            id:this.state.data.photosList[key].id,
            select:this.state.data.photosList[key].title
        })
    };
    render() {
        let {photosList}=this.state.data
        // console.log(photosList)
        const menu = (
            <Menu>
                {
                    photosList.map((item,index)=>{
                        return(
                            <Menu.Item key={index}  onClick={this.change.bind(this)}>
                                <a target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            </Menu.Item>
                            
                        )
                    })
                }
              
            </Menu>
        );
        const uploadButton = (
            <div>
              {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const { imgUrl } = this.state;
        let token=("Bearer "+localStorage.getItem("elementToken"))
        return (
          <div>
             <Form
                {...layout}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish.bind(this)}
              >
                <Form.Item
                  name="estatePhotosId"
                  label="相册标题"
                >
                    
                    <Dropdown overlay={menu} placement="bottomLeft" >
                        <Button>{this.state.select}</Button>
                    </Dropdown>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="图片名称"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                  name="imgUrl"
                  label="图片"
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action= {this.$api.upload}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange.bind(this)}
                        headers={{Authorization:token}}
                    >
                        {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item
                  name="indexShow"
                  label="是否首页展示"
                  initialValue={true}
                >
                   <Switch defaultChecked onChange={this.onChange.bind(this)} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    提交
                  </Button>
                  <Button type="primary" style={{'marginLeft':'20px'}} onClick={()=>this.props.history.go(-1)}>返回</Button>
                </Form.Item>
              </Form>
          </div>
        )
    }
}

export default HousingPhotoAdd
