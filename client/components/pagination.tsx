'use client'
import React, { useCallback } from 'react'
import { Button } from './ui/button'
import {
  DotsThree,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react/dist/ssr'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import usePagination from '@/lib/hooks/usePagination'

interface PaginationProps {
  page: number
  totalPages: number
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const pages = usePagination({ currentPage: page, totalPages })

  const getNewUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', page.toString())
      return `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  const getNavButton = useCallback(
    (direction: 'left' | 'right') => {
      const isLeft = direction === 'left'
      const disabled = isLeft ? page <= 1 : page >= totalPages
      const Icon = isLeft ? CaretLeft : CaretRight
      const newPage = isLeft ? page - 1 : page + 1

      return (
        <Button
          variant='ghost'
          size='icon'
          disabled={disabled}
          asChild={!disabled}
        >
          {disabled ? (
            <Icon size={28} className='text-muted-foreground' />
          ) : (
            <Link href={getNewUrl(newPage)}>
              <Icon size={28} className='text-muted-foreground' />
            </Link>
          )}
        </Button>
      )
    },
    [getNewUrl, page, totalPages]
  )

  return (
    <div className='flex justify-center space-x-2 items-center'>
      {getNavButton('left')}
      {pages.map((p) => {
        if (p === '...') {
          return (
            <DotsThree key={p} size={30} className='text-muted-foreground' />
          )
        }
        return (
          <Button key={p} variant={p === page ? 'secondary' : 'ghost'} asChild>
            <Link href={getNewUrl(p)}>{p}</Link>
          </Button>
        )
      })}
      {getNavButton('right')}
    </div>
  )
}

export default Pagination
