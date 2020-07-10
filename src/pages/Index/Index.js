import React, { Component } from 'react'

import { Route, Switch,Link,Redirect } from 'react-router-dom'
import Houses from '../Houses/Houses'
import HousesAdd from '../Houses/HousesAdd'
import HousesDetail from '../Houses/HousesDetail'
import Banner from '../Banner/Banner'
import BannerDetail from '../Banner/BannerDetail'
import HousingAdd from '../Houses/HousingAdd'
import Project from '../Project/Project'
import HousingPhoto from '../HousingPhoto/HousingPhoto'
import HousingPhotoAdd from '../HousingPhoto/HousingPhotoAdd'
import HousesCompile from '../Houses/HousesCompile'

import './Index.styl'
import { Layout, Menu,message } from 'antd';
import {MenuUnfoldOutlined,MenuFoldOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class Index extends Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
    
    render() {
        if(!localStorage.elementToken){
            message.error('请先登录');
            return <Redirect to={"/login"} />
        }
        return (
            <Layout className="main">
                {/* 侧边栏 */}
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                        <SubMenu key="sub1" title="楼盘管理">
                            <Menu.Item key="1">
                                <Link to="/index/houses">楼盘基本信息</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="轮播图管理">
                            <Menu.Item key="2">
                                <Link to="/index/banner">轮播图管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title="注册/登录">
                            <Menu.Item key="3-1">注册</Menu.Item>
                            <Menu.Item key="3-2">登录</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title="用户管理">
                            <Menu.Item key="4-1">基本信息</Menu.Item>
                            <Menu.Item key="4-2">我的好友</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title="推荐管理">
                            <Menu.Item key="5-1">楼盘推荐</Menu.Item>
                            <Menu.Item key="5-2">我的客户</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub6" title="楼盘收藏/分享">
                            <Menu.Item key="6-1">楼盘收藏</Menu.Item>
                            <Menu.Item key="6-">楼盘分享</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    {/* 头部 */}
                    <Header className="site-layout-background header" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggleCollapsed,
                        })}
                    </Header>
                    {/* 容器 */}
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow:"scroll"
                        }}
                    >
                        
                        <Switch>
                            <Route path="/index/houses" exact component={Houses} />
                            <Route path="/index/houses/add" exact component={HousesAdd} />
                            <Route path="/index/houses/detail" exact component={HousesDetail} />
                            <Route path="/index/houses/housingadd" exact component={HousingAdd} />
                            <Route path="/index/houses/housescompile" exact component={HousesCompile} />
                            <Route path="/index/project" exact component={Project} />
                            <Route path="/index/housingphoto" exact component={HousingPhoto} />
                            <Route path="/index/housingphotoadd" exact component={HousingPhotoAdd} />
                            <Route path="/index/banner" exact component={Banner} />
                            <Route path='/index/banner/detail' exact component={BannerDetail} />
                            <Redirect to={"/index/houses"} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Index
