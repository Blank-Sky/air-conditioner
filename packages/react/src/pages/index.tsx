import React from 'react'

import AirConditioner from '~/components/ac/AirConditioner'
import ProTip from '~/components/ProTip'

import RemoteControl from '~/components/RemoteControl'
import Toast from '~/components/Toast'

import { useAcCtx } from '~/context'
import { useDetectStorage } from '~/hooks'

/**
 * 主页
 */
const Home: React.FC = () => {
  const { state: ac } = useAcCtx()

  useDetectStorage()

  /**
   * 根据模式返回对应的色温
   */
  function getClassByMode() {
    if (ac.status)
      return ac.mode === 'hot' ? 'hot-color' : 'cold-color'
    else
      return ''
  }

  return (
    <div className={`max-w-600px m-auto ${getClassByMode()}`}>
      <div className="pt-6">
        <h1 className="text-center text-3xl">
          便携遥控器
        </h1>
        <ProTip />
        <AirConditioner
          status={ac.status}
          temperature={ac.temperature}
          mode={ac.mode}
        />
        <RemoteControl />
      </div>

      <Toast />
    </div>
  )
}

export default Home
