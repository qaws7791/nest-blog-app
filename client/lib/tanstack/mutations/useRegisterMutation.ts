import postEmailRegister from '@/api/auth/postEmailRegister'
import { saveRefreshTokenToLocalStorage } from '@/lib/utils'
import useAuthStore from '@/stores/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useRegisterMutation = () => {
  const { setAccessToken } = useAuthStore()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: postEmailRegister,
    onSuccess: async (data) => {
      const { accessToken, refreshToken } = data.data
      setAccessToken(accessToken)
      saveRefreshTokenToLocalStorage(refreshToken)
      alert('Register success')
      router.push('/')
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return mutation
}

export default useRegisterMutation
