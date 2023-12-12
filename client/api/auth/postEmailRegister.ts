import { AxiosPromise } from 'axios'
import axiosInstance from '../config'

export interface EmailRegisterRequest {
  email: string
  password: string
}
export interface EmailRegisterResponse {
  accessToken: string
  refreshToken: string
}

const postEmailRegister = (
  args: EmailRegisterRequest
): AxiosPromise<EmailRegisterResponse> =>
  axiosInstance.post('/auth/register/email', args)

export default postEmailRegister
