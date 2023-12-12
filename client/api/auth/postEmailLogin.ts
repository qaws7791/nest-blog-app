import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import { generateBasicToken } from '@/lib/utils'

export interface LoginRequest {
  email: string
  password: string
}
export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

const postEmailLogin = (args: LoginRequest): AxiosPromise<LoginResponse> => {
  const basicToken = generateBasicToken(args)

  const headers = {
    Authorization: `Basic ${basicToken}`,
  }

  return axiosInstance.post('/auth/login/email', undefined, {
    headers,
  })
}

export default postEmailLogin
