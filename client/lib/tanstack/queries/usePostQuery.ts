import getPost, { getPostRequest } from '@/api/posts/getPostById'
import { useQuery } from '@tanstack/react-query'

const usePostQuery = (args: getPostRequest) => {
  return useQuery({
    queryKey: ['post', args.id],
    queryFn: () => getPost(args),
    enabled: !!args.id,
  })
}

export default usePostQuery
