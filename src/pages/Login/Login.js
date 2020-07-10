import React, { Component } from 'react'
import {Redirect } from 'react-router-dom'
import './Login.styl'

import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

    
class Login extends Component {
    gotoHome() {
        this.props.history.push('/home')
    }
    onFinish (values) {
        this.$axios({
            method:'post',
            url:this.$api.login.login,
            params:values,
            headers:{
                Authorization:"Basic eWQtc3lzOnlkLXN5cw=="
            }
        }).then(res=>{
            
            localStorage.setItem("elementToken",res.data.data.oAuth2AccessToken.value)
            console.log(res.data.data.userId)
            localStorage.setItem("userId",res.data.data.userId)
            message.success("登录成功");
            this.props.history.push('/index')
        })

      };
    render() {
        if(localStorage.elementToken){
            return <Redirect to={"/index"} />
        }
        return (
            <div className="P-login">
                <div className="box">
                    <div className="bgi"></div>
                    <div className="main">
                        <h3>毅德商业管理系统</h3>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish.bind(this)}
                            
                            >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item>
                                <div className="btn">
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                    </Button>
                                    <Button type="primary" className="login-form-button">
                                    修改密码
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                   </div>
                </div>
            </div>
            
         )
    }
   
}

export default Login
