import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import { PostDetail } from '@/types/common.types'

export interface getPostRequest {
  id: number
}

export interface getPostResponse extends PostDetail {}

const getPost = (args: getPostRequest): AxiosPromise<getPostResponse> => {
  return axiosInstance.get(`/posts/${args.id}`)
}

export default getPost
