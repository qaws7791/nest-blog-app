'use client'
import patchUpdatePost from '@/api/posts/patchUpdatePost'
import postCreatePost from '@/api/posts/postCreatePost'
import Editor from '@/components/editor'
import InputImage from '@/components/input-image'
import InputTag from '@/components/input-tag'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useCreatePostMutation from '@/lib/tanstack/mutations/useCreatePostMutation'
import useUpdatePostMutation from '@/lib/tanstack/mutations/useUpdatePostMutation'
import { PostDetail } from '@/types/common.types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

/**
 *  게시글 작성 폼
 *  1. 제목 입력
 *  2. feature image 업로드
 *  3. 설명 입력
 *  4. 본문 입력
 *  5. 태그 입력
 *  6. 게시글 작성 버튼
 */

interface PostWriteFormProps extends React.HTMLAttributes<HTMLDivElement> {
  post?: PostDetail
  submitMutation:
    | ReturnType<typeof useCreatePostMutation>
    | ReturnType<typeof useUpdatePostMutation>
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Please enter a title',
    })
    .max(50, {
      message: 'Please enter the title no more than 50 characters',
    }),
  featuredImage: z
    .string()
    .min(1, { message: 'Please upload the thumbnail image' }),
  description: z
    .string()
    .min(0, {
      message: 'Please enter a description',
    })
    .max(100, {
      message: 'Please enter the description no more than 100 characters',
    }),
  content: z.string(),
  tags: z.array(z.string()),
})

const PostWriteForm = ({ post, submitMutation }: PostWriteFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title ?? '',
      featuredImage: post?.featuredImage ?? '',
      description: post?.description ?? '',
      content: post?.content ?? '',
      tags: post?.tags.map((tag) => tag.name) ?? ([] as string[]),
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit', values)
    console.log(submitMutation)
    submitMutation.mutate(values)
  }
  // React.useEffect(() => {
  //   const subscription = form.watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   )
  //   return () => subscription.unsubscribe()
  // }, [form])

  const featuredImage = form.watch('featuredImage')

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-3'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='featuredImage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <InputImage
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {featuredImage && (
          <Image
            src={featuredImage}
            alt='image'
            width={600}
            height={300}
            className='rounded w-full aspect-w-2 aspect-h-1'
          />
        )}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <InputTag {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Publish
        </Button>
      </form>
    </Form>
  )
}

export default PostWriteForm
