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

interface PaginationProps {
  page: number
  totalPages: number
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getNewUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)
      params.set('page', page.toString())
      return `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  const getPageButtons = useCallback(
    (start: number, end: number) => {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
        (p) => (
          <Button key={p} variant={p === page ? 'secondary' : 'ghost'} asChild>
            <Link href={getNewUrl(p)}>{p}</Link>
          </Button>
        )
      )
    },
    [getNewUrl, page]
  )

  const getNavButton = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      return (
        <Button
          variant='ghost'
          size='icon'
          disabled={page < 2}
          asChild={page >= 2}
        >
          {page > 1 ? (
            <Link href={getNewUrl(page - 1)}>
              <CaretLeft size={28} className='text-muted-foreground' />
            </Link>
          ) : (
            <CaretLeft size={28} className='text-muted-foreground' />
          )}
        </Button>
      )
    }
    return (
      <Button
        variant='ghost'
        disabled={page >= totalPages}
        asChild={page < totalPages}
      >
        {page < totalPages ? (
          <Link href={getNewUrl(page + 1)}>
            <CaretRight size={28} className='text-muted-foreground' />
          </Link>
        ) : (
          <CaretRight size={28} className='text-muted-foreground' />
        )}
      </Button>
    )
  }

  return (
    <div className='flex justify-center space-x-2 items-center'>
      {getNavButton('left')}
      {totalPages < 6 ? (
        <>{getPageButtons(1, totalPages)}</>
      ) : page < 4 ? (
        <>
          {getPageButtons(1, 3)}
          <DotsThree size={28} className='text-muted-foreground' />
          <Button variant='ghost' asChild>
            <Link href={getNewUrl(totalPages)}>{totalPages}</Link>
          </Button>
        </>
      ) : page > totalPages - 3 ? (
        <>
          <Button variant='ghost' asChild>
            <Link href={getNewUrl(1)}>1</Link>
          </Button>
          <DotsThree size={28} className='text-muted-foreground' />
          {getPageButtons(totalPages - 2, totalPages)}
        </>
      ) : (
        <>
          <Button variant='ghost' asChild>
            <Link href={getNewUrl(1)}>1</Link>
          </Button>
          <DotsThree size={28} className='text-muted-foreground' />
          <Button variant='secondary' asChild>
            <Link href={getNewUrl(page)}>{page}</Link>
          </Button>
          <DotsThree size={28} className='text-muted-foreground' />
          <Button variant='ghost' asChild>
            <Link href={getNewUrl(totalPages)}>{totalPages}</Link>
          </Button>
        </>
      )}
      {getNavButton('right')}
    </div>
  )
}

export default Pagination
