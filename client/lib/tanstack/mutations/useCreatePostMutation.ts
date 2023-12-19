import postCreatePost from '@/api/posts/postCreatePost'
import { useMutation } from '@tanstack/react-query'

const useCreatePostMutation = () => {
  const mutation = useMutation({
    mutationFn: postCreatePost,
    onSuccess: async (data) => {
      alert('Create post success')
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return mutation
}

export default useCreatePostMutation
