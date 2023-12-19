import deletePost from '@/api/posts/deletePost'
import { useMutation } from '@tanstack/react-query'

const useDeletePostMutation = () => {
  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (data) => {
      alert('Delete post success')
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return mutation
}

export default useDeletePostMutation
