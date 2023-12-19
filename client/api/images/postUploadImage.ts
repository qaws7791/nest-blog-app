import { AxiosPromise } from 'axios'
import axiosInstance from '../config'

interface UploadImageRequest {
  formData: FormData
}

interface UploadImageResponse {
  fileName: string
}

const postUploadImage = (
  args: UploadImageRequest
): AxiosPromise<UploadImageResponse> => {
  return axiosInstance.post('/images', args.formData)
}

export default postUploadImage
