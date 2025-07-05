import type { AcState } from '~/types'
import { get, post } from '~/utils/request'

export const sendAcStatus = (data: AcState) => post('/ac/control', data)

export const getAcStatus = () => get('/ac/status')
