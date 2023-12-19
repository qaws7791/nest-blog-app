import postUploadImage from '@/api/images/postUploadImage'
import { getPublicImageURL } from '@/lib/utils'
import React, { useCallback } from 'react'
import { Input } from './ui/input'

interface InputImageProps {
  value: string
  onChange: (value: string) => void
}

/**
 *
 * @param value 이미지 주소
 * @param onChange 이미지 주소 변경 함수
 * @returns
 */
const InputImage = ({ value, onChange }: InputImageProps) => {
  const onChangeInput = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return
      const file = event.target.files[0]
      if (!file) return
      const formData = new FormData()
      formData.append('image', file)
      try {
        const res = await postUploadImage({ formData })
        const { fileName } = res.data
        const fileUrl = getPublicImageURL(fileName)
        onChange(fileUrl)
      } catch (error) {
        console.log(error)
        alert('이미지 업로드에 실패했습니다.')
      }
    },
    [onChange]
  )

  return (
    <div>
      <Input type='file' onChange={onChangeInput} />
    </div>
  )
}

export default InputImage
