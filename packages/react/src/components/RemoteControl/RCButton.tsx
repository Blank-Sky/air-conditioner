import { Fab } from '@mui/material'
import React from 'react'

/**
 * 遥控器按钮
 * @param props
 */
const RCButton: React.FC<React.PropsWithChildren<{
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}>> = (props) => {
  return (
    <Fab
      className={`rc-button ${props.className}`}
      {...props}
      onClick={() => {
        props.onClick && props.onClick()
      }}
    >
    </Fab>
  )
}

export default RCButton
