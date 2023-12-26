import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import { ApiDeleteResponse } from '@/types/common.types'

interface DeletePostResponse extends ApiDeleteResponse {}

const deletePost = (id: number): AxiosPromise<DeletePostResponse> => {
  return axiosInstance.delete(`/posts/${id}`)
}

export default deletePost
