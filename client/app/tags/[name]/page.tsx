import getPosts from '@/api/posts/getPosts'
import Pagination from '@/components/pagination'
import PostList from '@/components/post-list'
import { parseSearchParamAsNumber } from '@/lib/utils'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

interface PageProps {
  params: {
    tag: string
  }
  searchParams: {
    page?: string
    size?: string
  }
}

export async function generateMetadata(
  { searchParams, params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const page = parseSearchParamAsNumber(searchParams.page)
  const size = parseSearchParamAsNumber(searchParams.size)
  const tag = decodeURIComponent(params.tag)

  // fetch data
  const { data } = await getPosts({
    tag,
    page,
    size,
  })

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const firstImage = data.results[0]?.featuredImage
  return {
    title: `#${tag} - NextBlog`,
    description: `Tag Search Result for #${tag} - NextBlog`,
    openGraph: {
      images: [firstImage, ...previousImages],
    },
  }
}

const TagSearchPage = async ({ params, searchParams }: PageProps) => {
  const tag = decodeURIComponent(params.tag)
  const page = parseSearchParamAsNumber(searchParams.page)
  const size = parseSearchParamAsNumber(searchParams.size)
  const { data } = await getPosts({
    tag,
    page,
    size,
  })
  return (
    <div className='mx-auto flex w-full max-w-[716px] flex-col justify-center space-y-6 md:w-[700px] px-2 md:px-4'>
      <h1 className='text-3xl font-medium text-center'># {tag}</h1>
      <PostList posts={data.results} />
      <Pagination page={data.currentPage} totalPages={data.totalPages} />
    </div>
  )
}

export default TagSearchPage
