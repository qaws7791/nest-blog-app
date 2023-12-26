import axios from 'axios'
import { checkAndSetAccessToken, handleApiUrl } from './interceptors'
import { getRefreshTokenFromLocalStorage } from '@/lib/utils'
import postGetAccessToken from './auth/postGetAccessToken'
import useAuthStore from '@/stores/useAuthStore'

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 3000,
})

axiosInstance.interceptors.request.use(checkAndSetAccessToken)
axiosInstance.interceptors.request.use(handleApiUrl)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('엑시오스 에러', error)
    const { response } = error
    if (response.status === 401) {
      console.log('토큰 만료')

      const refreshToken = getRefreshTokenFromLocalStorage()
      if (!refreshToken) {
        console.log('리프레시 토큰이 없습니다.')
        return Promise.reject(error)
      }
      try {
        const accessTokenResponse = await postGetAccessToken(refreshToken)
        console.log('토큰 재발급 성공', accessTokenResponse)
        const newAccessToken = accessTokenResponse.data.accessToken
        useAuthStore.getState().setAccessToken(newAccessToken)
        return axiosInstance(error.config)
      } catch (e) {
        console.log('토큰 재발급 실패')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
