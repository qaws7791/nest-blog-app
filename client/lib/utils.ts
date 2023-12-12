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
