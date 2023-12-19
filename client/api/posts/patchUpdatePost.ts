import { AxiosPromise } from 'axios'
import axiosInstance from '../config'

export interface UpdatePostRequest {
  title: string
  description: string
  featuredImage: string
  content: string
  tags: string[]
}

interface UpdatePostResponse {
  statusCode: number
  message: string
}

const patchUpdatePost = (
  id: number,
  args: UpdatePostRequest
): AxiosPromise<UpdatePostResponse> => {
  return axiosInstance.patch(`/posts/${id}`, args)
}

export default patchUpdatePost
