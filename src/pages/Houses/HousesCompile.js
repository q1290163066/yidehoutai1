import React, { Component } from 'react'
import {
    Form,
    Input,
    Button
  } from 'antd';

    
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };
class HousesCompile extends Component {
    onFinish (values) {
        // console.log(values)
      };
    render() {
        
        return (
            <div style={{textAlign:"center"}}>
                <Form
                    {...layout}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish.bind(this)}
                    >
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="city"
                    label="	楼盘所属地市"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="commissionRisen"
                    label="	佣金比例"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="commissionRule"
                    label="	佣金规则描述"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="discountInfo"
                    label="	优惠信息"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="estateHousingDTOList"
                    label="	楼盘户型"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>
                    <Form.Item
                    name="address"
                    label="	楼盘详细地址"
                    >
                    <Input  />
                    </Form.Item>

                    <Form.Item  {...tailLayout}>
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

export default HousesCompile
