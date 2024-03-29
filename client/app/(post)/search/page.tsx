import getPosts from '@/api/posts/getPosts'
import Pagination from '@/components/pagination'
import PostList from '@/components/post-list'
import { parseSearchParamAsNumber } from '@/lib/utils'
import { Metadata, ResolvingMetadata } from 'next'

interface SearchPageProps {
  searchParams: {
    page: string
    size: string
    q: string
  }
}

export async function generateMetadata(
  { searchParams }: SearchPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const page = parseSearchParamAsNumber(searchParams.page)
  const size = parseSearchParamAsNumber(searchParams.size)
  const title = decodeURIComponent(searchParams.q)

  // fetch data
  const { data } = await getPosts({ page, size, title })

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const firstImage = data.results[0]?.featuredImage
  return {
    title: `${title} - NextBlog`,
    description: `Title Search Result for ${title} - NextBlog`,
    openGraph: {
      images: [firstImage, ...previousImages],
    },
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const page = parseSearchParamAsNumber(searchParams.page)
  const size = parseSearchParamAsNumber(searchParams.size)
  const title = decodeURIComponent(searchParams.q)
  const { data } = await getPosts({ page, size, title })

  return (
    <main className='mx-auto flex w-full max-w-[716px] flex-col justify-center space-y-6 md:w-[700px] px-2 md:px-4'>
      <h1 className='text-4xl font-bold my-10 text-center md:text-left'>
        Search Result for {`"${title}"`}
      </h1>
      <PostList posts={data.results} />
      <Pagination page={data.currentPage} totalPages={data.totalPages} />
    </main>
  )
}

export default SearchPage
