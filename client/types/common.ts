/**
 * @description API 에러 응답
 * @interface ApiErrorResponse
 * @property {number} statusCode - 상태 코드
 * @property {string[]} message - 에러 메시지
 * @property {string} error - 에러 타입
 * @example
 * {
 *  "message": [
 *   "최대 100개까지 조회할 수 있습니다."
 * ],
 * "error": "Bad Request",
 * "statusCode": 400
 * }
 */
export interface ApiDeleteResponse {
  message: string
  error: string
  id: number
}

export interface ApiErrorResponse {
  statusCode: number
  message: string[]
  error: string
}

export type RolesEnums = 'ADMIN' | 'USER'

export interface CommonModel {
  id: number
  createdAt: string
  updatedAt: string
}

export interface Tags extends CommonModel {
  id: number
  name: string
}

export interface Post extends CommonModel {
  title: string
  description: string
  featuredImage: string
  content: string
}

export interface User extends CommonModel {
  email: string
  nickname: string
  role: RolesEnums
}

export interface PostPreview
  extends Pick<
    Post,
    'id' | 'title' | 'description' | 'featuredImage' | 'createdAt'
  > {
  author: User
}

export interface PostDetail extends Post {
  author: Pick<User, 'id' | 'nickname' | 'email' | 'role'>
  tags: Pick<Tags, 'id' | 'name'>[]
}

export interface Pagination<T> {
  results: T[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}
