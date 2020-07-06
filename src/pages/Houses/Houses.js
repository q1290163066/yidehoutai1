import React, { Component } from 'react'
import './Houses.styl'
import { Card,Button,Space,Table} from 'antd'

// 添加和更新
export default class Houses extends Component{
 
  render(){
    const extra=(
      <Button type='promary' onClick={()=>this.props.history.push('houses/detail')}>
        添加
      </Button>
    )
    return(
      <Card extra={extra}>
      <Table 
        bordered
        columns={this.columns}
        rowKey='id'
      />
    </Card>
    )
  }
}