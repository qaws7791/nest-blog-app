import axios from 'axios'
import { checkAndSetAccessToken } from './interceptors'

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  timeout: 3000,
})

axiosInstance.interceptors.request.use(checkAndSetAccessToken)

export default axiosInstance
