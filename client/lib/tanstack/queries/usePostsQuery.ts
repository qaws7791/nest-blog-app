import getPosts, { getPostsRequest } from '@/api/posts/getPosts'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const usePostsQuery = (args: getPostsRequest) => {
  return useQuery({
    queryKey: ['posts', args],
    queryFn: () => getPosts(args),
    placeholderData: keepPreviousData,
  })
}

export default usePostsQuery
