import getCurrentUser from '@/api/users/getCurrentUser'
import { useQuery } from '@tanstack/react-query'

const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => getCurrentUser(),
  })
}

export default useCurrentUserQuery
