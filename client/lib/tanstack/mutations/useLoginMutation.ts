import postEmailLogin from '@/api/auth/postEmailLogin'
import { saveRefreshTokenToLocalStorage } from '@/lib/utils'
import useAuthStore from '@/stores/useAuthStore'
import { useMutation } from '@tanstack/react-query'

const useLoginMutation = () => {
  const { setAccessToken } = useAuthStore()

  const mutation = useMutation({
    mutationFn: postEmailLogin,
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data.data
      setAccessToken(accessToken)
      saveRefreshTokenToLocalStorage(refreshToken)
      alert('Login success')
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return mutation
}

export default useLoginMutation
