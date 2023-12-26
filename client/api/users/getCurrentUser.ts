import { AxiosPromise } from 'axios'
import axiosInstance from '../config'
import { User } from '@/types/common.types'

const getCurrentUser = (): AxiosPromise<User> => {
  return axiosInstance.get('/users/me')
}

export default getCurrentUser
