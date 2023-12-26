import getPosts from '@/api/posts/getPosts'
import Pagination from '@/components/pagination'
import PostList from '@/components/post-list'

interface PageProps {
  searchParams: {
    page: string
    size: string
  }
}

export default async function Home({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page) || 1
  const size = parseInt(searchParams.size) || 10
  const {
    data: { results, currentPage, totalPages },
  } = await getPosts({ page, size })

  return (
    <main className='mx-auto flex w-full max-w-[716px] flex-col justify-center space-y-6 md:w-[700px] px-2 md:px-4'>
      <h1 className='text-4xl font-bold my-10 text-center md:text-left'>
        Next Blog
      </h1>
      <PostList posts={results} />
      <Pagination page={currentPage} totalPages={10} />
    </main>
  )
}
