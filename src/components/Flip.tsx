import React from 'react'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface Props {
  open: boolean,
  children: () => React.ReactNode,
  onClose: () => void
}
const Flip = ({ open, children, onClose }: Props) =>
  open ? (
    <div>
      <Button type="primary" onClick={onClose} shape="round" icon={<CloseOutlined />} />
      {children()}
    </div>
  ) : null

export default Flip
