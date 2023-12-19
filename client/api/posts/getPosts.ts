import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import { Pagination, PostPreview } from '@/types/common'

export interface getPostsRequest {
  page: number
  size: number
}

interface getPostsResponse extends Pagination<PostPreview> {}

const getPosts = (params: getPostsRequest): AxiosPromise<getPostsResponse> => {
  return axiosInstance.get('/posts', {
    params,
  })
}

export default getPosts
