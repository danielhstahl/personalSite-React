| [Linux][lin-link] | [Coveralls][cov-link] |
| :---------------: | :-------------------: |
|   ![lin-badge]    |     ![cov-badge]      |

[lin-badge]: https://github.com/danielhstahl/personalSite-React/workflows/test/badge.svg
[lin-link]: https://github.com/danielhstahl/personalSite-React/actions
[cov-badge]: https://coveralls.io/repos/github/danielhstahl/personalSite-React/badge.svg?branch=master
[cov-link]: https://coveralls.io/github/danielhstahl/personalSite-React

This is the html code for my [personal website](http://danielhstahl.com).

## Development

Built with [Vite](https://vitejs.dev) + [Vitest](https://vitest.dev) browser mode (Playwright/Chromium).

```bash
npm i                       # install dependencies
npx playwright install chromium   # browser binaries for the test runner

npm run dev                 # dev server
npm run build               # tsc -b && vite build -> dist/
npm test                    # vitest (watch)
npm run test:ci             # vitest run (single run, for CI)
```

### Headless browser prerequisites

Running the test suite needs Chromium's system libraries **and** a working
fontconfig with at least one installed font. On a bare container the renderer
will hard-crash (not a test failure) with:

```
FATAL:third_party/skia/src/ports/SkFontMgr_FontConfigInterface.cpp Not implemented
```

Fix by installing the usual browser/font packages (needs root), e.g.:

```bash
npx playwright install --with-deps chromium
# and/or: apt-get install -y fonts-dejavu-core fontconfig
```

### Formatting

Prettier config lives in [`.prettierrc`](.prettierrc) (single quotes, no semicolons)
and is picked up by both `npx prettier --write .` and the lint-staged pre-commit hook.
Ignore rules are in [`.prettierignore`](.prettierignore).
