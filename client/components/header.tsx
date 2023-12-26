'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { FormEvent, useEffect, useState } from 'react'
import { List, MagnifyingGlass, X } from '@phosphor-icons/react'
import { Input } from './ui/input'
import { usePathname, useRouter } from 'next/navigation'
import useAuthStore from '@/stores/useAuthStore'
import useUserStore from '@/stores/useUserStore'
import { useQueryClient } from '@tanstack/react-query'

type Category = {
  name: string
  href: string
}

const CATEGORY_LIST: Category[] = [
  { name: 'Posts', href: '/' },
  {
    name: 'Tags',
    href: '/tags',
  },
]

const MenuList = () => {
  return (
    <ul className='p-z bg-white'>
      {CATEGORY_LIST.map((category) => (
        <li key={category.href} className='p-3'>
          <Link href={`${category.href}`} className='bg-white'>
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const BottomMenu = () => {
  const { accessToken, clearAccessToken } = useAuthStore()
  const { clearUser } = useUserStore()
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const handleLogout = () => {
    clearAccessToken()
    clearUser()
    queryClient.clear()
    window.alert('로그아웃 되었습니다.')
  }
  return (
    <div className='flex flex-col gap-3 w-full'>
      {accessToken ? (
        <>
          <Button asChild>
            <Link href='/write'>Write Post</Link>
          </Button>
          <Button variant='secondary' onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <Button asChild>
          <Link
            href={`/login?${
              pathname !== 'login' ? `redirect=${window.location.href}` : ''
            }`}
          >
            Login
          </Link>
        </Button>
      )}
    </div>
  )
}

const SearchBar = ({ closeSearch }: { closeSearch: () => void }) => {
  const router = useRouter()

  const submitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const search = e.currentTarget.search.value
    router.push(`/search?q=${search}`)
  }

  return (
    <>
      <div className='w-full relative'>
        <MagnifyingGlass
          size={20}
          className='absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground'
        />
        <form onSubmit={submitSearch} autoComplete='off'>
          <label htmlFor='search' className='sr-only'>
            아티클 검색
          </label>
          <Input
            type='search'
            id='search'
            name='search'
            placeholder='아티클 검색'
            className='pl-8'
            autoComplete='off'
            minLength={1}
            maxLength={100}
          />
        </form>
      </div>
      <Button
        variant='ghost'
        onClick={closeSearch}
        type='button'
        className='text-muted-foreground hover:text-muted-foreground'
      >
        취소
      </Button>
    </>
  )
}

const Header = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { accessToken } = useAuthStore()
  const { user } = useUserStore()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search')?.focus()
      }, 100)
    }
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
          <SearchBar closeSearch={toggleSearch} />
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
            <div>
              <div className='border border-y-gray-300 rounded-md p-4'>
                {user ? (
                  <>
                    Hello, <span>{user.nickname}</span>
                  </>
                ) : (
                  <>Please login for more features.</>
                )}
              </div>
              <MenuList />
            </div>
            <BottomMenu />
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
