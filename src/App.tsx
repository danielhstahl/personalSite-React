import React from 'react'
import { Avatar, ConfigProvider, Layout, Menu } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import avatar from './assets/images/avatar.png'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { MENU_ITEMS } from './constants/menu'
import type { MenuItem } from './constants/menu'
import { appTheme } from './theme'
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
    <ConfigProvider theme={appTheme}>
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="app-brand">
            <Avatar size="large" src={avatar} />
            <span className="app-brand-name">Daniel Stahl</span>
          </div>
          <Menu
            className="app-nav"
            theme="dark"
            mode="horizontal"
            /**
             * Collapse into the indicator when the items no longer fit, instead
             * of overflowing. The previous header wrapped the menu in a
             * `<Space>`, whose items form an inflexible inline-flex chain, so the
             * 529px menu could never compress and pushed the header out to 673px
             * inside a 375px viewport.
             *
             * Note there is deliberately no `breakpoint` prop here: `breakpoint`
             * belongs to `Layout.Sider`, not `Menu`. rc-overflow collapses on
             * *available width*, so the control appears exactly when the items
             * stop fitting rather than at an arbitrary CSS breakpoint.
             */
            overflowedIndicator={
              <MenuUnfoldOutlined aria-label="Open navigation menu" />
            }
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
        </Header>
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </ConfigProvider>
  )
}

export default App
