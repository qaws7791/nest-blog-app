import postEmailLogin from '@/api/auth/postEmailLogin'
import getCurrentUser from '@/api/users/getCurrentUser'
import { saveRefreshTokenToLocalStorage } from '@/lib/utils'
import useAuthStore from '@/stores/useAuthStore'
import useUserStore from '@/stores/useUserStore'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

const useLoginMutation = () => {
  const { setAccessToken } = useAuthStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/'

  const mutation = useMutation({
    mutationFn: postEmailLogin,
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data.data
      setAccessToken(accessToken)
      saveRefreshTokenToLocalStorage(refreshToken)
      alert('Login success')
      router.replace(redirectUrl)
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return mutation
}

export default useLoginMutation
