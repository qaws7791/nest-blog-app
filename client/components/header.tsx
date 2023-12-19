'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { List, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Input } from './ui/input'
import { usePathname } from 'next/navigation'
import useAuthStore from '@/stores/useAuthStore'

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
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { accessToken } = useAuthStore()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, isSearchOpen])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  return (
    <div className='border-b border-gray-200 h-14 bg-white fixed w-full left-0 top-0 z-50'>
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
          <div className='flex flex-col justify-between h-screen px-6 pb-20'>
            <ul className='p-z bg-white'>
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
            {accessToken ? (
              <div className='flex flex-col gap-3 w-full'>
                <Button asChild>
                  <Link href='/write'>Write Post</Link>
                </Button>
                <Button variant='secondary'>Logout</Button>
              </div>
            ) : (
              <div className='flex flex-col gap-3 w-full'>
                <Button asChild>
                  <Link
                    href={`/login?${
                      pathname !== 'login'
                        ? `redirect=${window.location.href}`
                        : ''
                    }`}
                  >
                    Login
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
