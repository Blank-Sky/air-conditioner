import { blue, green, red } from '@mui/material/colors'

import React from 'react'
import { useAc, useAcCtx } from '~/context'
import RCButton from './RCButton'

import { useAcTemperature } from './temperature'
import './index.scss'

/**
 * 切换空调工作状态
 */
function toggleAC(status: boolean) {
  // 打印
  console.log(status)
}

/**
 * 遥控
 */
const RemoteControl: React.FC = () => {
  const { toggleStatus, toggleMode } = useAc()
  const { state: ac } = useAcCtx()

  const { increase, decrease } = useAcTemperature()

  return (
    <div className="flex my-6 flex-col items-center">
      <div>
        {' '}
        <RCButton
          aria-label="cold"
          style={{
            color: 'white',
            backgroundColor: blue[700],
          }}
          onClick={() => {
            toggleMode('cold')
          }}
        >
          <div className="i-ic-round-ac-unit text-2xl" />
        </RCButton>
        <RCButton
          aria-label="add"
          onClick={() => {
            toggleAC(ac.status)
            toggleStatus()
          }}
          style={{
            backgroundColor: ac.status ? red[600] : green[600],
            color: 'white',
          }}
        >
          <div className="i-ic:round-power-settings-new text-2xl" />
        </RCButton>
        <RCButton
          aria-label="hot"
          style={{ backgroundColor: 'orange', color: 'white' }}
          onClick={() => {
            toggleMode('hot')
          }}
        >
          <div className="i-ic-round-wb-sunny text-2xl" />
        </RCButton>
      </div>
      <RCButton
        aria-label="add"
        onClick={increase}
      >
        <div className="i-mdi-triangle-small-up text-4xl" />
      </RCButton>
      <RCButton
        aria-label="reduce"
        onClick={decrease}
      >
        <div className="i-mdi-triangle-small-down text-4xl" />
      </RCButton>
    </div>
  )
}

export default RemoteControl
