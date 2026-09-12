import React from 'react'
import { Card, Typography } from 'antd'
import { imageStyle } from '../utils/image'

const { Meta } = Card

interface BaseCardProps {
  title: React.ReactNode
  children?: React.ReactNode
}

export interface ImageCardProps extends BaseCardProps {
  image: string
  alt: string
  height?: string
}

/**
 * Card with a fixed-height, overflow-clipped cover image.
 *
 * Consolidates the `Card` + cover-wrapper + `imageStyle` pattern that was
 * copy-pasted across Home, About and Research. The wrapper div is what keeps
 * the cover from overflowing the card, and the `imageStyle` height must match
 * the wrapper height, so both are driven off a single `height` prop.
 */
export const ImageCard = ({
  image,
  alt,
  height = '200px',
  title,
  children,
}: ImageCardProps) => (
  <Card
    hoverable
    cover={
      <div style={{ overflow: 'hidden', height }}>
        <img src={image} alt={alt} loading="lazy" style={imageStyle(height)} />
      </div>
    }
  >
    <Meta title={title} />
    {children}
  </Card>
)

export interface LinkCardProps extends BaseCardProps {
  action: { href: string; label: string }
}

/**
 * Card with a secondary-styled action link in the card footer.
 *
 * Replaces the hand-rolled `<a color="secondary" className="float-right
 * text-secondary">` markup, which used an invalid (non-standard) `color`
 * attribute on a plain anchor. antd's Typography.Link carries the link
 * semantics and styling instead.
 */
export const LinkCard = ({ action, title, children }: LinkCardProps) => (
  <Card
    hoverable
    actions={[
      <Typography.Link
        key={action.href}
        className="float-right text-secondary"
        href={action.href}
      >
        {action.label}
      </Typography.Link>,
    ]}
  >
    <Meta title={title} />
    {children}
  </Card>
)

export default ImageCard
