import getPost from '@/api/posts/getPostById'
import Image from 'next/image'
import React from 'react'
import './quill-render.css'
import PostButtons from './_components/post-buttons'
import { formatDateString } from '@/lib/utils'
import { Clock } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface PageProps {
  params: {
    id: string
  }
}

const PostDetailPage = async ({ params }: PageProps) => {
  const id = parseInt(params.id)
  const { data } = await getPost({ id })
  return (
    <div className='mx-auto flex w-full max-w-[716px] flex-col justify-center space-y-6 md:w-[700px] px-2 md:px-4'>
      <div>
        <Image
          src={data.featuredImage}
          alt={data.title}
          width={768}
          height={1137}
          className='rounded-lg object-cover w-full aspect-[40/27]'
        />
      </div>
      <h1 className='text-4xl font-semibold'>{data.title}</h1>
      <p className='text-muted-foreground'>{data.description}</p>
      <div className='text-muted-foreground flex justify-between'>
        <div className='flex items-center gap-2 leading-6'>
          <Clock size={24} className='text-muted-foreground' />
          <time>{formatDateString(data.createdAt)}</time>
        </div>
        <span>by {data.author.nickname}</span>
      </div>
      <div
        className='ql-render'
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
      <PostButtons post={data} />
      <div className='flex gap-2'>
        {data.tags.map((tag) => (
          <Badge variant='outline' key={tag.id} className='text-base'>
            <Link href={`/tag/${tag.id}`}>{tag.name}</Link>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default PostDetailPage
