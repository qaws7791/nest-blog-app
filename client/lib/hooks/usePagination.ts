type NumberOrEllipsis = number | '...'
type NumberOrEllipsisArray = NumberOrEllipsis[]

const usePagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}): NumberOrEllipsisArray => {
  const pages: NumberOrEllipsisArray = [1]

  if (totalPages <= 5) {
    for (let i = 2; i < totalPages; i++) {
      pages.push(i)
    }
  } else if (currentPage <= 3) {
    pages.push(2, 3, '...')
  } else if (currentPage > totalPages - 3) {
    pages.push('...', totalPages - 2, totalPages - 1)
  } else {
    pages.push('...', currentPage, '...')
  }
  pages.push(totalPages)

  return pages
}

export default usePagination
