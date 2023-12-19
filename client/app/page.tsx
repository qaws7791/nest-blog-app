import Link from 'next/link'
import PostList from './_components/post-list'
import { Pagination, PostPreview } from '@/types/common'
import getPosts from '@/api/posts/getPosts'

interface PageProps {
  searchParams: {
    page: string
    size: string
  }
}

export default async function Home({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page) || 1
  const size = parseInt(searchParams.size) || 10
  const { data } = await getPosts({ page, size })

  return (
    <main className=' h-screen px-4'>
      <h1 className='text-4xl font-bold my-10'>New Posts</h1>
      <PostList posts={data.results} />
    </main>
  )
}
