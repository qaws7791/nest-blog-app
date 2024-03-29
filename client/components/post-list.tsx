import getPosts from '@/api/posts/getPosts'
import { formatDateString } from '@/lib/utils'
import { PostPreview } from '@/types/common.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface PostListProps {
  posts: PostPreview[]
}

const PostList = async ({ posts }: PostListProps) => {
  return (
    <ul className='flex flex-col gap-8'>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/post/${post.id}`} className='flex gap-4'>
            <div>
              <Image
                src={post.featuredImage}
                width={160}
                height={106}
                alt={post.title}
                className='rounded-lg object-cover w-40 aspect-[40/27]'
              />
            </div>
            <div>
              <p className='text-lg font-medium'>{post.title}</p>
              <p className='text-base text-muted-foreground'>
                {post.description}
              </p>
              <p className='text-sm text-muted-foreground'>
                {formatDateString(post.createdAt)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostList
