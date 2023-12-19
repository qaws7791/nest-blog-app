import axios from 'axios'
import { checkAndSetAccessToken, handleApiUrl } from './interceptors'

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 3000,
})

axiosInstance.interceptors.request.use(checkAndSetAccessToken)
axiosInstance.interceptors.request.use(handleApiUrl)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('엑시오스 에러', error)
  }
)

export default axiosInstance
