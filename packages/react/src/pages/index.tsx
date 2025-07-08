import React, { useEffect } from 'react'
import AirConditioner from '~/components/ac/AirConditioner'

import ProTip from '~/components/ProTip'
import RemoteControl from '~/components/RemoteControl'

import { getAcStatus } from '~/components/RemoteControl/apiACControl'
import Toast from '~/components/Toast'
import { defaultState, useAcCtx } from '~/context'
import { useToastCtx } from '~/context/toast'
import { useDetectStorage } from '~/hooks'

function fallbackToLocalStorage() {
  useDetectStorage()
}

/**
 * 主页
 */
const Home: React.FC = () => {
  const { state: ac, dispatch } = useAcCtx()
  const { dispatch: dispatchToast } = useToastCtx()
  useEffect(() => {
    // 页面首次加载，获取空调状态
    getAcStatus()
      .then((res) => {
        // 2. 检查返回值是否是合法对象
        if (
          typeof res !== 'object'
        ) {
          throw new TypeError('返回的空调状态格式不正确') // 👈 触发 catch
        }

        // 3. 正常派发
        dispatch({
          type: 'update',
          payload: {
            ...defaultState,
            ...res,
          },
        })
        dispatchToast({
          type: 'update',
          payload: {
            message: '遥控器连接成功',
            open: true,
            severity: 'success',
          },
        })
      })
      .catch((err) => {
        console.error('获取空调状态失败:', err)
        fallbackToLocalStorage()
        dispatchToast({
          type: 'update',
          payload: {
            message: '空调状态获取失败',
            open: true,
            severity: 'error',
          },
        })
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
