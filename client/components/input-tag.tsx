'use client'
import { XCircle } from '@phosphor-icons/react'
import {
  useState,
  KeyboardEvent,
  ChangeEvent,
  useCallback,
  forwardRef,
} from 'react'

interface InputTagProps {
  value: string[]
  onChange: (value: string[]) => void
}

const InputTag = forwardRef<HTMLInputElement, InputTagProps>(
  ({ value, onChange }, ref) => {
    const [tagInput, setTagInput] = useState('')

    const addTag = useCallback(() => {
      if (tagInput.trim() === '' || value.includes(tagInput)) return
      console.log('onChange', [...value, tagInput])
      onChange([...value, tagInput])
      setTagInput('')
    }, [onChange, tagInput, value])

    const removeTag = useCallback(
      (tag: string) => {
        console.log('removeTag')
        onChange(value.filter((t) => t !== tag))
      },
      [onChange, value]
    )

    const onKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          addTag()
          return
        }
        if (e.key === 'Backspace' && tagInput === '') {
          removeTag(value[value.length - 1])
          return
        }
      },
      [addTag, removeTag, tagInput, value]
    )

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value)
    }, [])

    return (
      <div className='border p-2'>
        <ul className='inline-flex gap-1 flex-wrap'>
          {value.map((tag, i) => (
            <li key={tag} className='inline-flex bg-primary px-2 py-1 rounded'>
              <span className='text-white'>{tag}</span>
              <button
                className='ml-1'
                type='button'
                onClick={() => {
                  console.log('removeTag', tag)
                  removeTag(tag)
                }}
              >
                <XCircle size={24} color='#ffffff' weight='fill' />
              </button>
            </li>
          ))}
          <li className='px-2 py-1'>
            <input
              type='text'
              placeholder='Enter tags'
              onKeyDown={onKeyDown}
              onChange={handleChange}
              value={tagInput}
              className='w-24'
              ref={ref}
            />
          </li>
        </ul>
      </div>
    )
  }
)

InputTag.displayName = 'InputTag'

export default InputTag
