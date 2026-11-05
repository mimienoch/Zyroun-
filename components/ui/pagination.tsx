import { Icon } from "./icon";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

function itemClass(active: boolean, disabled?: boolean) {
  return `inline-flex size-10 items-center justify-center rounded-[10px] font-sans text-[10px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-z-300 ${
    disabled
      ? "text-disabled-text"
      : active
        ? "bg-z-300 text-white"
        : "bg-n-000 text-n-700 hover:bg-z-50"
  }`;
}

export function Pagination({ page, pageCount, onPageChange, className = "" }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
    (value) => value === 1 || value === pageCount || Math.abs(value - page) <= 1,
  );

  const shown: Array<number | "ellipsis"> = [];
  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) shown.push("ellipsis");
    shown.push(value);
  });

  return (
    <nav className={`inline-flex items-center gap-1 rounded-xl bg-n-100 p-1 ${className}`} aria-label="Pagination">
      <button
        type="button"
        className={itemClass(false, page <= 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        <Icon name="chevron-left" className="size-4" />
      </button>
      {shown.map((entry, index) =>
        entry === "ellipsis" ? (
          <span key={`e-${index}`} className={itemClass(false)} aria-hidden>
            …
          </span>
        ) : (
          <button
            key={entry}
            type="button"
            className={itemClass(entry === page)}
            aria-current={entry === page ? "page" : undefined}
            aria-label={`Page ${entry}`}
            onClick={() => onPageChange(entry)}
          >
            {entry}
          </button>
        ),
      )}
      <button
        type="button"
        className={itemClass(false, page >= pageCount)}
        disabled={page >= pageCount}
        aria-label="Next page"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
      >
        <Icon name="chevron-right" className="size-4" />
      </button>
    </nav>
  );
}
