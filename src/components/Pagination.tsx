import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

const getPages = (current: number, total: number) => {
  const pages: (number | string)[] = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, "...", total)
    } else if (current >= total - 2) {
      pages.push(1, "...", total - 2, total - 1, total)
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total)
    }
  }
  return pages
}

interface PaginationProps {
  page: number
  pageHandler: (page: number) => void
  dynamicPage: number
}

const Pagination: React.FC<PaginationProps> = ({ page, pageHandler, dynamicPage }) => {
  const pages = getPages(page, dynamicPage)

  return (
    <div className="mt-10 flex justify-center">
      <ShadPagination>
        <PaginationContent>

          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && pageHandler(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Numbers */}
          {pages.map((p, index) => (
            <PaginationItem key={index}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => pageHandler(p as number)}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < dynamicPage && pageHandler(page + 1)}
              className={page === dynamicPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

        </PaginationContent>
      </ShadPagination>
    </div>
  )
}

export default Pagination
