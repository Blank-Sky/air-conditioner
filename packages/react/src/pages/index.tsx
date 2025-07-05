import React, { useEffect } from 'react'
import AirConditioner from '~/components/ac/AirConditioner'

import ProTip from '~/components/ProTip'
import RemoteControl from '~/components/RemoteControl'

import { getAcStatus } from '~/components/RemoteControl/apiACControl'
import Toast from '~/components/Toast'
import { defaultState, useAcCtx } from '~/context'
import { useDetectStorage } from '~/hooks'

function fallbackToLocalStorage() {
  useDetectStorage()
}

/**
 * 主页
 */
const Home: React.FC = () => {
  const { state: ac, dispatch } = useAcCtx()
  useEffect(() => {
    // 页面首次加载，获取空调状态
    getAcStatus()
      .then((res) => {
        console.log('获取到的空调状态:', res)
        dispatch({
          type: 'update',
          payload: {
            ...defaultState,
            ...res,
          },
        })
      })
      .catch((err) => {
        console.error('获取空调状态失败:', err)
        // 非 hook 的 fallback 函数，比如：
        fallbackToLocalStorage()
      })
  }, []) // ✅ 空依赖数组，确保只运行一次

  /**
   * 根据模式返回对应的色温
   */
  function getClassByMode() {
    if (ac.power === 1)
      return ac.mode === 4 ? 'hot-color' : 'cold-color'
    else
      return ''
  }

  return (
    <div className={`max-w-600px m-auto ${getClassByMode()}`}>
      <div className="pt-6">
        <h1 className="text-center text-3xl">

        </h1>
        <ProTip />
        <AirConditioner
          power={ac.power}
          temp={ac.temp}
          mode={ac.mode}
        />
        <RemoteControl />
      </div>

      <Toast />
    </div>
  )
}

export default Home
