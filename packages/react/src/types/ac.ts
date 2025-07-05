export interface AcState {
  mode: number // [模式] 0: 自动, 1: 制冷, 2: 除湿, 3: 风扇, 4: 制热
  power: number // [电源] 1: 开机, 0: 关机
  fan: number // [风速] 0: 自动, 1: 低风, 2: 中风, 3: 高风 ...7: 7档
  swing_auto: number // [自动扫风] 1: 自动扫风, 0: 不自动扫风
  temp: number // [温度] 0: 16°C, 1: 17°C, 2: 18°C, 3: 19°C, 4: 20°C, 5: 21°C, 6: 22°C, 7: 23°C, 8: 24°C, 9: 25°C, 10: 26°C, 11: 27°C, 12: 28°C, 13: 29°C, 14: 30°C, 15: 31°C
  turbo: number // [强劲] 0: 关闭, 1: 开启
  light: number // [灯光] 0: 关闭, 1: 开启
  ion_filter: number // [负离子] 0: 关闭, 1: 开启
  x_fan: number // [特殊风 制冷-干燥模式 制热-电辅热] 0: 关闭, 1: 开启
  swing_v: number // [垂直扫风] 0: 关闭, 1: 开启
  swing_h: number // [水平扫风] 0: 关闭, 1: 开启
  timer: number // [定时] 规则未知
  sleep_mode: number // [睡眠模式] 0: 关闭, 1: 睡眠模式1, 2: 睡眠模式2, 3: 睡眠模式3
  quiet: number // [静音] 0: 关闭, 1: 开启
}
