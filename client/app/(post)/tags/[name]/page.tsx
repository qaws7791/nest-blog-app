import getPosts from '@/api/posts/getPosts'
import Pagination from '@/components/pagination'
import PostList from '@/components/post-list'
import { parseSearchParamAsNumber } from '@/lib/utils'
import React from 'react'

interface PageProps {
  params: {
    name: string
  }
  searchParams: {
    page?: string
    size?: string
  }
}

const TagSearchPage = async ({ params, searchParams }: PageProps) => {
  const { name } = params
  const decodedName = decodeURIComponent(name)
  const { page, size } = searchParams
  const { data } = await getPosts({
    tag: decodedName,
    page: parseSearchParamAsNumber(page),
    size: parseSearchParamAsNumber(size),
  })
  return (
    <div className='mx-auto flex w-full max-w-[716px] flex-col justify-center space-y-6 md:w-[700px] px-2 md:px-4'>
      <h1 className='text-3xl font-medium text-center'># {decodedName}</h1>
      <PostList posts={data.results} />
      <Pagination page={data.currentPage} totalPages={data.totalPages} />
    </div>
  )
}

export default TagSearchPage
