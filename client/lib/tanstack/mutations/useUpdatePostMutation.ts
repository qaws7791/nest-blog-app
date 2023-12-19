import patchUpdatePost, { UpdatePostRequest } from '@/api/posts/patchUpdatePost'
import { useMutation } from '@tanstack/react-query'

const useUpdatePostMutation = (id: number) => {
  const mutation = useMutation({
    mutationFn: (args: UpdatePostRequest) => patchUpdatePost(id, args),
    onSuccess: async (data) => {
      alert('Update post success')
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  return mutation
}

export default useUpdatePostMutation
