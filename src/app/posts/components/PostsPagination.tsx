'use client';

import { POSTS } from '@/site-settings/navigations';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Props = {
  page: number;
  hasNextPage: boolean;
  postCount: number;
};

const linkClass =
  'inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/40 px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 transition-colors hover:border-purple-500/40 dark:hover:border-purple-500/30 hover:text-purple-700 dark:hover:text-purple-300';

const disabledClass =
  'inline-flex items-center justify-center rounded-lg border border-slate-200/60 dark:border-slate-800/60 px-4 py-2 text-sm font-medium text-slate-400 dark:text-slate-600 cursor-not-allowed';

export function PostsPagination({ page, hasNextPage }: Props) {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const handelNext = () => {
    const url = search
      ? `${POSTS.href}?page=${page + 1}&search=${search}`
      : `${POSTS.href}?page=${page + 1}`;
    return url;
  };

  const handelPRev = () => {
    const url = search
      ? `${POSTS.href}?page=${page - 1}&search=${search}`
      : `${POSTS.href}?page=${page - 1}`;
    const p = page === 2 && `${POSTS}`;
    return url;
  };

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-between gap-4"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <Link
          href={
            page === 2
              ? `${search ? `POST.href?search=${search}` : POSTS.href}`
              : handelPRev()
          }
          className={linkClass}
        >
          Previous
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled>
          Previous
        </span>
      )}

      <span className="text-sm text-slate-600 dark:text-slate-400 tabular-nums">
        Page {page}
      </span>

      {hasNextPage ? (
        <Link href={handelNext()} className={linkClass}>
          Next
        </Link>
      ) : (
        <span className={disabledClass} aria-disabled>
          Next
        </span>
      )}
    </nav>
  );
}
