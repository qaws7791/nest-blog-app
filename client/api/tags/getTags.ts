import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import { TagWithPostCount } from '@/types/common.types'

const getTags = (): AxiosPromise<TagWithPostCount[]> => {
  return axiosInstance.get('/tags')
}

export default getTags
