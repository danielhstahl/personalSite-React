import { MENU_ITEMS, SOCIAL_LINKS } from './menu'
import { HOME, RESEARCH, PROJECTS, PERSPECTIVES, ABOUT } from './routes'

describe('MENU_ITEMS', () => {
  test('drives the router with every page route, plus the connect submenu', () => {
    expect(MENU_ITEMS.map((item) => item.key)).toEqual([
      HOME,
      RESEARCH,
      PROJECTS,
      PERSPECTIVES,
      ABOUT,
      'connect',
    ])
  })

  test('every routed entry carries a page element', () => {
    for (const item of MENU_ITEMS.filter((i) => i.key !== 'connect')) {
      expect(item.element).toBeDefined()
    }
  })

  test('connect is a link group: children, light theme, no route element', () => {
    const connect = MENU_ITEMS.find((item) => item.key === 'connect')
    expect(connect).toBeDefined()
    expect(connect?.element).toBeUndefined()
    expect(connect?.theme).toBe('light')
    expect(connect?.children).toBe(SOCIAL_LINKS)
    expect(connect?.children?.length).toBe(3)
  })

  test('every declared theme is light or dark', () => {
    const themes = MENU_ITEMS.map((item) => item.theme).filter(Boolean)
    for (const theme of themes) {
      expect(['light', 'dark']).toContain(theme)
    }
  })
})
