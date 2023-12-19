import { AxiosPromise } from 'axios'
import axiosInstance from '../config'

interface CreatePostRequest {
  title: string
  description: string
  featuredImage: string
  content: string
  tags: string[]
}

interface CreatePostResponse {
  statusCode: number
  message: string
}

const postCreatePost = (
  args: CreatePostRequest
): AxiosPromise<CreatePostResponse> => {
  return axiosInstance.post('/posts', args)
}

export default postCreatePost
