import { useAcCtx } from '~/context'
import { useToastCtx } from '~/context/toast'

export const maxTemperature = 31 - 16
export const minTemperature = 16 - 16

export function useAcTemperature() {
  const { state, dispatch } = useAcCtx()
  const { dispatch: dispatchToast } = useToastCtx()

  /**
   * 增加温度
   */
  const increase = () => {
    if (state.temp < maxTemperature) {
      dispatch({ type: 'increment' })
    }
    else {
      dispatchToast({
        type: 'update',
        payload: {
          message: '已经是最大温度啦！',
          open: true,
          severity: 'error',
        },
      })
    }
  }

  /**
   * 降低温度
   */
  const decrease = () => {
    if (state.temp > minTemperature) {
      dispatch({ type: 'decrement' })
    }
    else {
      dispatchToast({
        type: 'update',
        payload: {
          message: '已经是最小温度啦！',
          open: true,
          severity: 'error',
        },
      })
    }
  }

  return {
    increase,
    decrease,
  }
}
