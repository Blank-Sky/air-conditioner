import type { FC, PropsWithChildren } from 'react'
import type { AcState } from '~/types'
import { createContext, useContext, useReducer } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export const acStorageKey = 'ac:state'

type AcAction = { type: 'increment' | 'decrement' | 'togglePower' } | {
  type: 'power'
  power: AcState['power']
} | {
  type: 'mode'
  mode: AcState['mode']
} | {
  type: 'update'
  payload: Partial<AcState>
}

export const defaultState: AcState = {
  mode: 1, // [模式] 0: 自动, 1: 制冷, 2: 除湿, 3: 风扇, 4: 制热
  power: 0, // [电源] 1: 开机, 0: 关机
  fan: 3, // [风速] 0: 自动, 1: 低风, 2: 中风, 3: 高风 ...7: 7档
  swing_auto: 0, // [自动扫风] 1: 自动扫风, 0: 不自动扫风
  temp: 7, // [温度] 0: 16°C, 1: 17°C, 2: 18°C, 3: 19°C, 4: 20°C, 5: 21°C, 6: 22°C, 7: 23°C, 8: 24°C, 9: 25°C, 10: 26°C, 11: 27°C, 12: 28°C, 13: 29°C, 14: 30°C, 15: 31°C
  turbo: 1, // [强劲] 0: 关闭, 1: 开启
  light: 1, // [灯光] 0: 关闭, 1: 开启
  ion_filter: 0, // [负离子] 0: 关闭, 1: 开启
  x_fan: 0, // [特殊风 制冷-干燥模式 制热-电辅热] 0: 关闭, 1: 开启
  swing_v: 1, // [垂直扫风] 0: 关闭, 1: 开启
  swing_h: 0, // [水平扫风] 0: 关闭, 1: 开启
  timer: 0, // [定时] 规则未知
  sleep_mode: 0, // [睡眠模式] 0: 关闭, 1: 睡眠模式1, 2: 睡眠模式2, 3: 睡眠模式3
  quiet: 0, // [静音] 0: 关闭, 1: 开启
}

const AcContext = createContext<{
  state: AcState
  dispatch: (action: AcAction) => void
} | undefined>(undefined)
// AcContext.displayName = 'AC'

export const AcProvider: FC<PropsWithChildren> = (props) => {
  const [initState, setAcState] = useLocalStorage<AcState>(acStorageKey, defaultState)

  function acReducer(state: AcState, action: AcAction) {
    let val = { ...state }
    switch (action.type) {
      case 'increment':
        val.temp += 1
        break
      case 'decrement':
        val.temp -= 1
        break
      case 'togglePower':
        val.power = state.power ^ 1
        break
      case 'mode':
        val.mode = action.mode
        break
      case 'update':
        val = {
          ...state,
          ...action.payload,
        }
        break
      default:
        throw new Error('Unexpected Ac Action')
    }

    setAcState(val)
    return val
  }

  const [state, dispatch] = useReducer(acReducer, initState)
  return (
    <AcContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AcContext.Provider>
  )
}

export function useAcCtx() {
  const context = useContext(AcContext)
  if (context === undefined)
    throw new Error('useAcCtx must be used within a AcProvider')

  return context
}

export function useAc() {
  const { dispatch } = useAcCtx()
  return {
    /**
     * 切换开关状态
     */
    togglePower() {
      dispatch({ type: 'togglePower' })
    },
    toggleMode(mode: number) {
      dispatch({ type: 'mode', mode })
    },
  }
}
