import React from 'react'
import { Avatar, Space, Layout, Menu } from 'antd'
import avatar from './assets/images/avatar.png'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { MENU_ITEMS } from './constants/menu'
import type { MenuItem } from './constants/menu'
const { Header, Content } = Layout

export const loader = () => {
  return fetch('/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

const isKeyInRoute = (key: string, menu_items: MenuItem[]) => {
  return menu_items.find((v) => v.key === key) ? true : false
}

const App: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <Avatar size="large" icon={<img src={avatar} alt="" />} />
          <span style={{ color: 'rgba(255, 255, 255, 1)' }}>Daniel Stahl</span>
          <Menu
            style={{ flex: 1, minWidth: 0 }}
            theme="dark"
            mode="horizontal"
            onClick={({ key }) => {
              isKeyInRoute(key, MENU_ITEMS) && navigate(key)
            }}
            selectedKeys={[location.pathname]}
            items={MENU_ITEMS.map(({ key, label, children, theme }) => ({
              key,
              label,
              children,
              theme,
            }))}
          />
        </Space>
      </Header>
      <Content style={{ padding: '48px 5px' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default App
