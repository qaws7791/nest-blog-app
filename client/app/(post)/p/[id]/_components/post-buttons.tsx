'use client'
import { Button } from '@/components/ui/button'
import useDeletePostMutation from '@/lib/tanstack/mutations/useDeletePostMutation'
import useUserStore from '@/stores/useUserStore'
import { PostDetail } from '@/types/common'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  post: PostDetail
}

const PostButtons = ({ post }: Props) => {
  const router = useRouter()
  const { user } = useUserStore()
  const deletePostMutation = useDeletePostMutation()

  const handleDelete = async () => {
    console.log('delete post')
    const confirm = window.confirm('정말로 삭제하시겠습니까?')
    if (!confirm) return
    await deletePostMutation.mutateAsync(post.id)
    router.push('/')
  }

  if (!user) return null
  if (post.author.id !== user.id) return null

  return (
    <div>
      <Button variant='outline' asChild>
        <Link href={`/write?id=${post.id}`}>수정하기</Link>
      </Button>
      <Button variant='outline' onClick={handleDelete}>
        삭제하기
      </Button>
    </div>
  )
}

export default PostButtons
