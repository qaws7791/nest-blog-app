'use client'
import postUploadImage from '@/api/images/postUploadImage'
import { getPublicImageURL } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface CustomReactQuillProps extends ReactQuillProps {
  quillRef: React.MutableRefObject<ReactQuill | null>
}

const CustomReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    const Quill = ({ quillRef, ...props }: CustomReactQuillProps) => (
      <RQ ref={quillRef} {...props} />
    )
    return Quill
  },
  { ssr: false }
)

interface EditorProps {
  value: string
  onChange: (value: string) => void
  id?: string
  name?: string
}
/**
 * 업로드 로직
 * 0. 이미지 클릭 -> 이미지 선택
 * 1. 이미지 Form Data 업로드 -> 이미지 주소를 응답으로 받음
 * 2. 이미지 주소를 에디터에 삽입하고 이미지 배열을 따로 관리
 * 3. 게시글 업로드 시 이미지 배열을 게시글 content와 각각 비교
 * -> 게시글에 존재하는 이미지 주소만 전송
 */

const Editor = forwardRef<HTMLDivElement, EditorProps>((props, ref) => {
  const { value, onChange, ...rest } = props
  console.log(value)
  const quillRef = useRef<ReactQuill>(null)

  const imageHandler = useCallback(() => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      const file = input.files![0]
      const formData = new FormData()
      formData.append('image', file)
      try {
        if (!quillRef.current) return
        const res = await postUploadImage({ formData })
        const { fileName } = res.data
        const fileUrl = getPublicImageURL(fileName)
        const quill = quillRef.current.getEditor()
        const range = quill.getSelection()
        if (range === null) return
        quill.insertEmbed(range.index, 'image', fileUrl)
        quill.setSelection(range.index + 1, 0)
      } catch (err) {
        console.error(err)
        alert('이미지 업로드에 실패했습니다.')
      }
    }
  }, [])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler]
  )

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'link',
      'image',
    ],
    []
  )

  useEffect(() => {
    console.log('value', value)
  }, [value])

  return (
    <div ref={ref}>
      <CustomReactQuill
        quillRef={quillRef}
        theme='snow'
        value={value}
        onChange={onChange}
        formats={formats}
        modules={modules}
        id={rest.id}
        name={rest.name}
        {...rest}
      />
    </div>
  )
})

Editor.displayName = 'Editor'

export default Editor
