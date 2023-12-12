'use client'
import useAuthStore from '@/stores/useAuthStore'
import React from 'react'

const UserInfo = () => {
  const { accessToken } = useAuthStore()
  return (
    <div>
      <h3>UserInfo</h3>
      <p>{accessToken}</p>
    </div>
  )
}

export default UserInfo
