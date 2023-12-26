import { AxiosPromise } from 'axios'
import axiosInstance from '../config'

export type getAccessTokenRequest = string
export interface getAccessTokenResponse {
  accessToken: string
}

const postGetAccessToken = (
  refreshToken: getAccessTokenRequest
): AxiosPromise<getAccessTokenResponse> => {
  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  }

  return axiosInstance.post('/auth/token/access', undefined, {
    headers,
  })
}

export default postGetAccessToken
