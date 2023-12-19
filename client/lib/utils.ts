import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const saveRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

export const getRefreshTokenFromLocalStorage = (): string => {
  return localStorage.getItem('refreshToken') || ''
}

export const removeRefreshTokenFromLocalStorage = () => {
  localStorage.removeItem('refreshToken')
}

export const generateBasicToken = ({
  email,
  password,
}: {
  email: string
  password: string
}) => {
  return Buffer.from(`${email}:${password}`, 'utf-8').toString('base64')
}

export const getPublicImageURL = (fileName: string) => {
  return `http://${process.env.NEXT_PUBLIC_API_URL}/public/images/${fileName}`
}

export const formatDateString = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export const parseSearchParamAsNumber = (searchParam: string | undefined) => {
  if (!searchParam) return undefined

  const parsed = Number(searchParam)

  if (isNaN(parsed)) return undefined

  return parsed
}
