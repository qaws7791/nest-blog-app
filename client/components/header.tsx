'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { useState } from 'react'
import {
  List,
  MagnifyingGlass,
  MagnifyingGlassPlus,
  X,
} from '@phosphor-icons/react'
import { Input } from './ui/input'

type Category = {
  name: string
  href: string
}

const CATEGORY_LIST: Category[] = [
  { name: 'All', href: '' },
  { name: 'Write', href: 'write' },
  { name: 'Jewelry', href: 'jewelry' },
  { name: 'Shoes', href: 'shoes' },
  { name: 'Watches', href: 'watches' },
  { name: 'Bags', href: 'bags' },
  { name: 'Sunglasses', href: 'sunglasses' },
  { name: 'Hats', href: 'hats' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <div className='border-b border-gray-200 h-14 bg-white fixed w-full left-0 top-0'>
      <nav className='flex justify-between items-center h-full mx-4 gap-2'>
        {isSearchOpen ? (
          <>
            <label htmlFor='search' className='sr-only'>
              아티클 검색
            </label>
            <div className='w-full relative'>
              <MagnifyingGlass
                size={20}
                className='absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground'
              />
              <Input placeholder='아티클 검색' className='indent-6' />
            </div>
            <Button
              variant='ghost'
              onClick={toggleSearch}
              type='button'
              className='text-muted-foreground hover:text-muted-foreground'
            >
              취소
            </Button>
          </>
        ) : (
          <>
            <div>
              <Link href='/'>
                <Image src='/logo.svg' alt='logo' width={150} height={30} />
              </Link>
            </div>
            <div className='flex gap-2'>
              {!isMenuOpen && (
                <Button variant='ghost' size='icon' onClick={toggleSearch}>
                  {/* <Icon name='search' /> */}
                  <MagnifyingGlass
                    size={24}
                    className='text-muted-foreground'
                  />
                </Button>
              )}
              <Button variant='ghost' size='icon' onClick={toggleMenu}>
                {isMenuOpen ? (
                  <X size={24} className='text-muted-foreground' />
                ) : (
                  <List size={24} className='text-muted-foreground' />
                )}
              </Button>
            </div>
          </>
        )}
      </nav>
      <div className='bg-white'>
        {isMenuOpen && (
          <div className='h-screen mb-[-60px]'>
            <ul className='p-3 bg-white'>
              {CATEGORY_LIST.map((category) => (
                <li key={category.href} className='p-3'>
                  <Link
                    href={`/category/${category.href}`}
                    className='bg-white'
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
