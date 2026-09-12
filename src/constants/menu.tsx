import type { ReactNode } from 'react'
import { Space } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import Home from '../pages/Home'
import Research from '../pages/Research'
import Projects from '../pages/Projects'
import Perspectives from '../pages/Perspectives'
import About from '../pages/About'
import { HOME, RESEARCH, PROJECTS, PERSPECTIVES, ABOUT } from './routes'

/**
 * One entry in the app's navigation model.
 *
 * `element` is the routed page consumed by the router in `index.tsx`; the other
 * fields are handed to antd's `<Menu>`. `children` deliberately reuses antd's
 * public `MenuProps['items']` type rather than reaching into antd's internal
 * menu-interface module path, which is not a public API surface and can move or
 * vanish between minor versions.
 */
export interface MenuItem {
  key: string
  label: ReactNode
  children?: MenuProps['items']
  element?: ReactNode
  theme?: 'light' | 'dark'
}

/** External profile links, rendered under the "Connect" submenu. */
export const SOCIAL_LINKS: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.linkedin.com/profile/view?id=AAIAAAYja3AB_fq6IhUtF5CBw1yjTHheP8YIooE&trk=nav_responsive_tab_profile"
      >
        LinkedIn
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/danielhstahl"
      >
        Github
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://medium.com/@danstahl1138"
      >
        Medium
      </a>
    ),
  },
]

/**
 * The single source of truth for both the header menu and the router: each
 * top-level entry carries its own route key, menu label, and page element.
 * `SOCIAL_LINKS` is the one branch with no `element` — it is a link group, not
 * a route.
 */
export const MENU_ITEMS: MenuItem[] = [
  { key: HOME, label: 'Home', element: <Home /> },
  { key: RESEARCH, label: 'Research', element: <Research /> },
  { key: PROJECTS, label: 'Projects', element: <Projects /> },
  { key: PERSPECTIVES, label: 'Perspectives', element: <Perspectives /> },
  { key: ABOUT, label: 'About', element: <About /> },
  {
    key: 'connect',
    label: (
      <Space>
        Connect
        <DownOutlined />
      </Space>
    ),
    children: SOCIAL_LINKS,
    theme: 'light',
  },
]
