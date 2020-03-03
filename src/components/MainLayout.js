import React, { useState } from "react";
import { Layout, Menu, Icon, Dropdown, message } from "antd";
import { withRouter } from 'react-router-dom'

import { Link } from 'react-router-dom'
import '../assets/scss/layout.scss'

const { Header, Footer, Sider, Content } = Layout;

function MainLayout({ children, history }) {
  const [isCollapse, setisCollapse] = useState(false)
  const isAuthenticated = localStorage.getItem('access_token')
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    // remove token
    localStorage.removeItem('access_token')
    message.success('You are logged out')
    // redirect
    history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout id="main-layout">
      <Sider trigger={null} collapsible collapsed={isCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="plus" />
              <span>Add new Movie</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/movies">
              <Icon type="gold" />
              <span>All movies</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/about">
              <Icon type="question" />
              <span>About</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', background: "#fff", padding: 0, justifyContent: 'space-between' }}>
          <Icon
            className="trigger"
            type={isCollapse ? "menu-unfold" : "menu-fold"}
            onClick={() => setisCollapse(!isCollapse)}
          />
          {
            isAuthenticated ?
              (
                <Dropdown overlay={menu}>
                  <div className="ant-dropdown-link" style={{ marginRight: '2em' }}>
                    {user.name} <Icon type="down" />
                  </div>
                </Dropdown>
              ) : ''
          }
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Notflix ©2020</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(MainLayout);
