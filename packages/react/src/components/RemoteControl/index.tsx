import { blue, green, red } from '@mui/material/colors'

import React from 'react'
import { useAc, useAcCtx } from '~/context'
import { useToastCtx } from '~/context/toast'

import { sendAcStatus } from './apiACControl'
import RCButton from './RCButton'
import { useAcTemperature } from './temperature'
import './index.scss'

/**
 * 遥控
 */
const RemoteControl: React.FC = () => {
  const { togglePower, toggleMode } = useAc()
  const { state: ac } = useAcCtx()
  const { dispatch: dispatchToast } = useToastCtx()
  const { increase, decrease } = useAcTemperature()

  const sendAC = () => {
    // 发送空调状态
    dispatchToast({
      type: 'update',
      payload: {
        message: '正在发送遥控指令...',
        open: true,
        severity: 'info',
      },
    })
    sendAcStatus(ac)
      .then(() => {
        dispatchToast({
          type: 'update',
          payload: {
            message: '遥控指令发送成功',
            open: true,
            severity: 'success',
          },
        })
      })
      .catch(() => {
        dispatchToast({
          type: 'update',
          payload: {
            message: '遥控指令发送失败',
            open: true,
            severity: 'error',
          },
        })
      })
  }

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
            toggleMode(1)
          }}
        >
          <div className="i-ic-round-ac-unit text-2xl" />
        </RCButton>
        <RCButton
          aria-label="add"
          onClick={() => {
            togglePower()
          }}
          style={{
            backgroundColor: ac.power ? red[600] : green[600],
            color: 'white',
          }}
        >
          <div className="i-ic:round-power-settings-new text-2xl" />
        </RCButton>
        <RCButton
          aria-label="hot"
          style={{ backgroundColor: 'orange', color: 'white' }}
          onClick={() => {
            toggleMode(4)
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
      <RCButton
        aria-label="send"
        onClick={sendAC}
      >
        <div className="i-mdi-telegram text-3xl" />
      </RCButton>
    </div>
  )
}

export default RemoteControl
