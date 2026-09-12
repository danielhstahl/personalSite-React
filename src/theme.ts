import type { ThemeConfig } from 'antd'

/**
 * Explicit global theme for the app, applied once at the root via
 * `<ConfigProvider theme={appTheme}>`.
 *
 * Every value here is the colour/size the site *already* rendered with before
 * this refactor (measured from the computed styles of a live build), so moving
 * them from scattered inline `style={{...}}` objects into tokens is a no-op
 * visually — it just puts the look in one auditable place instead of in five
 * ad-hoc inline objects.
 */

/**
 * The font actually used by the site.
 *
 * This is antd's default system stack, which is what the browser resolved for
 * rendered text. The site previously *also* declared `'Roboto', sans-serif` in
 * `index.css` and pulled Roboto from the Google Fonts CDN via a render-blocking
 * `@import` in `index.html` — but the `html` rule was overridden by antd, so
 * Roboto was downloaded on every page load and never actually rendered a single
 * glyph. Declared font now matches reality: no Roboto declared, no Roboto loaded.
 *
 * To make the site genuinely Roboto, load the font and set this token to
 * `'Roboto', <this stack>` in one change.
 */
export const SYSTEM_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', " +
  "Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', " +
  "'Segoe UI Symbol', 'Noto Color Emoji'"

export const appTheme: ThemeConfig = {
  token: {
    fontFamily: SYSTEM_FONT_STACK,
  },
  components: {
    Layout: {
      /** Was the antd default behind `Header`'s inline styles. */
      headerBg: '#001529',
      /** Replaces the inline `color: 'rgba(255, 255, 255, 1)'` on the name. */
      headerColor: '#ffffff',
      headerHeight: 64,
      /** Replaces the header's old inline horizontal padding. */
      headerPadding: '0 24px',
      /** Matches what `Layout` rendered as before. */
      bodyBg: '#f5f5f5',
    },
  },
}
