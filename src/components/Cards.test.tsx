import React from 'react'
import { render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { ImageCard, LinkCard } from './Cards'

const PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

describe('ImageCard', () => {
  test('cover image has the given alt and is lazy loaded', async () => {
    render(
      <ImageCard
        image={PIXEL}
        alt="Credit risk paper cover"
        title="Credit Risk"
        height="200px"
      >
        <p>body</p>
      </ImageCard>,
    )
    await expect
      .element(page.getByRole('img', { name: 'Credit risk paper cover' }))
      .toBeInTheDocument()
    const el = document.querySelector('img')
    expect(el).not.toBeNull()
    expect(el!.getAttribute('alt')).toBe('Credit risk paper cover')
    expect(el!.getAttribute('loading')).toBe('lazy')
  })

  test('height prop drives both the overflow wrapper and the image', async () => {
    render(
      <ImageCard image={PIXEL} alt="x" title="T" height="333px">
        <p>body</p>
      </ImageCard>,
    )
    await expect.element(page.getByText('body')).toBeInTheDocument()
    const el = document.querySelector('img')
    expect(el).not.toBeNull()
    const wrapper = el!.parentElement!
    expect(wrapper.style.overflow).toBe('hidden')
    expect(wrapper.style.height).toBe('333px')
    expect(el!.style.minHeight).toBe('333px')
    expect(el!.style.minWidth).toBe('100%')
  })

  test('renders the title via card meta', async () => {
    render(<ImageCard image={PIXEL} alt="x" title="My Title" />)
    await expect.element(page.getByText('My Title')).toBeInTheDocument()
  })
})

describe('LinkCard', () => {
  test('renders the action link with href and label', async () => {
    render(
      <LinkCard
        title="Credit Risk"
        action={{
          href: 'https://example.com/paper.pdf',
          label: 'Documentation',
        }}
      >
        <p>body</p>
      </LinkCard>,
    )
    const link = page.getByText('Documentation')
    await expect.element(link).toBeInTheDocument()
    const el = link.element() as HTMLAnchorElement | null
    expect(el!.getAttribute('href')).toBe('https://example.com/paper.pdf')
  })

  test('does not emit the invalid `color` attribute on the anchor', async () => {
    render(
      <LinkCard
        title="Credit Risk"
        action={{
          href: 'https://example.com/paper.pdf',
          label: 'Documentation',
        }}
      />,
    )
    const link = page.getByText('Documentation')
    await expect.element(link).toBeInTheDocument()
    const el = link.element() as HTMLAnchorElement | null
    expect(el!.hasAttribute('color')).toBe(false)
  })
})
