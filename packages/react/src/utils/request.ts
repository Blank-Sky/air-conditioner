// src/utils/request.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://node-red.haojiahuo233.com', // 设置统一的基础路径（根据你项目需要修改）
  timeout: 10000, // 请求超时时间（可选）
})

// 请求拦截器（可选）
instance.interceptors.request.use(
  (config: any) => {
    // 在这里可以统一设置请求头，比如添加 token
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config
  },
  (error: any) => Promise.reject(error),
)

// 响应拦截器（可选）
instance.interceptors.response.use(
  (response: { data: any }) => response.data,
  (error: any) => {
    // 全局错误处理
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

// 封装四个常用方法
export function get(url: string, params = {}, config = {}) {
  return instance.get(url, { params, ...config })
}

export function post(url: string, data = {}, config = {}) {
  return instance.post(url, data, config)
}

export function put(url: string, data = {}, config = {}) {
  return instance.put(url, data, config)
}

export function del(url: string, config = {}) {
  return instance.delete(url, config)
}
