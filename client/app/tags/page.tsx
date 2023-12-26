import getTags from '@/api/tags/getTags'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Tags - NextBlog',
  description: 'Tags - NextBlog',
}

const TagsPage = async () => {
  const { data } = await getTags()
  return (
    <div>
      <h1 className='text-3xl text-center'>Tags</h1>
      <ul className='flex gap-2 flex-wrap mt-3'>
        {data.map((tag) => (
          <li key={tag.id}>
            <Badge
              variant='outline'
              key={tag.id}
              className='text-lg bg-background'
            >
              <Link href={`/tags/${tag.name}`}>
                {tag.name} ({tag.postCount})
              </Link>
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TagsPage
