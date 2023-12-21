import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import {
  PaginationRequest,
  PaginationResponse,
  PostPreview,
} from '@/types/common'

export interface getPostsRequest extends PaginationRequest {
  tag?: string
  title?: string
}

interface getPostsResponse extends PaginationResponse<PostPreview> {}

const getPosts = (params: getPostsRequest): AxiosPromise<getPostsResponse> => {
  return axiosInstance.get('/posts', {
    params,
  })
}

export default getPosts
