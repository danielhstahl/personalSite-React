import React from 'react'
import Research from './pages/Research'
import About from './pages/About'
import Perspectives from './pages/Perspectives'
import Home from './pages/Home'
import Projects from './pages/Projects'
import {
  HOME,
  RESEARCH,
  PROJECTS,
  ABOUT,
  PERSPECTIVES
} from './constants/routes'
import { Avatar, Space, Layout, Menu, } from 'antd';
import { DownOutlined } from '@ant-design/icons'
import avatar from './assets/images/avatar.png'
import type { MenuProps } from 'antd';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ItemType } from 'antd/es/menu/hooks/useItems'
const { Header, Content } = Layout;


export const loader = () => {
  return fetch("/session", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const CHAT_ROUTE = "/chat"
export const CONTEXT_ROUTE = "/context"
export const PROMPT_ROUTE = "/prompt"

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/profile/view?id=AAIAAAYja3AB_fq6IhUtF5CBw1yjTHheP8YIooE&trk=nav_responsive_tab_profile">
        LinkedIn
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/danielhstahl">
        Github
      </a>
    )
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@danstahl1138">
        Medium
      </a>
    )
  },
];

export const MENU_ITEMS: MenuItem[] = [
  { key: HOME, label: "Home", element: <Home /> },
  { key: RESEARCH, label: "Research", element: <Research /> },
  { key: PROJECTS, label: "Projects", element: <Projects /> },
  { key: PERSPECTIVES, label: "Perspectives", element: <Perspectives /> },
  { key: ABOUT, label: "About", element: <About /> },
  {
    key: "connect", label: <Space>
      Connect
      <DownOutlined />
    </Space>, children: items, theme: "light"
  }
]
interface MenuItem {
  key: string;
  label: string | JSX.Element;
  children?: ItemType[];
  element?: JSX.Element;
  theme?: string;
}

const isKeyInRoute = (key: string, menu_items: MenuItem[]) => {
  return menu_items.find(v => v.key === key) ? true : false
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Space>
          <Avatar size="large" icon={<img src={avatar} alt="" />} />
          <span style={{ color: "rgba(255, 255, 255, 1)" }}>Daniel Stahl</span>
          <Menu
            style={{ flex: 1, minWidth: 0 }}
            theme="dark"
            mode="horizontal"
            onClick={({ key }) => {
              isKeyInRoute(key, MENU_ITEMS) && navigate(key)
            }}
            selectedKeys={[location.pathname]}
            items={MENU_ITEMS.map(({ key, label, children, theme }) => ({ key, label, children, theme }))}
          />
        </Space>
      </Header>
      <Content style={{ padding: '48px 5px' }}>
        <Outlet />
      </Content>
    </Layout >
  );
};


export default App
