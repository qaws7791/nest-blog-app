import useAuthStore from '@/stores/useAuthStore'
import { AxiosError, InternalAxiosRequestConfig } from 'axios'

export const checkAndSetAccessToken = (config: InternalAxiosRequestConfig) => {
  const newConfig = { ...config }
  const accessToken = useAuthStore.getState().accessToken
  if (accessToken) {
    newConfig.headers.Authorization = `Bearer ${accessToken}`
  }

  return newConfig
}

export const handleTokenError = async (error: AxiosError) => {
  const originalRequest = error.config

  if (!error.response || !originalRequest)
    throw new Error('에러가 발생했습니다.')

  const { data, status } = error.response

  // if(status === 401) {
  //     const { accessToken, refreshToken } = await postNewToken():
  // }
}
