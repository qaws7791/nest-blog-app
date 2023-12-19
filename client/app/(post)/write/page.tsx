import Editor from '@/components/editor'
import InputTag from '@/components/input-tag'
import React from 'react'
import PostWriteForm from './_components/post-write-form'
import PostFormContainer from './_components/post-form-container'
import { parseSearchParamAsNumber } from '@/lib/utils'

interface PostWritePageProps {
  searchParams: {
    id: string
  }
}

const PostWritePage = ({ searchParams }: PostWritePageProps) => {
  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]'>
      <PostFormContainer id={parseInt(searchParams.id)} />
    </div>
  )
}

export default PostWritePage
