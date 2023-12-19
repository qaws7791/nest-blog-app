'use client'
import usePostQuery from '@/lib/tanstack/queries/usePostQuery'
import React from 'react'
import PostWriteForm from './post-write-form'
import useCreatePostMutation from '@/lib/tanstack/mutations/useCreatePostMutation'
import useUpdatePostMutation from '@/lib/tanstack/mutations/useUpdatePostMutation'

interface PostFormContainerProps {
  id: number
}

const PostFormContainer = ({ id }: PostFormContainerProps) => {
  const { data, isLoading, isError } = usePostQuery({ id })
  const createPostMutation = useCreatePostMutation()
  const updatePostMutation = useUpdatePostMutation(id)

  if (!id) {
    console.log('create post form', createPostMutation)
    return <PostWriteForm submitMutation={createPostMutation} />
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (!data) return <div>Not found</div>
  console.log('edit post form', updatePostMutation)
  return <PostWriteForm post={data.data} submitMutation={updatePostMutation} />
}

export default PostFormContainer
