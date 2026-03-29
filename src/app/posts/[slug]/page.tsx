import Link from 'next/link';
import { PostCard } from '../components/PostCard';
import { Suspense } from 'react';

type Props = { searchParams: Promise<{ slug: string }> };

export default async function PostPage(props: Props) {
  const searchParams = props.searchParams.then((sp) => sp);

  return (
    <article className="min-h-screen flex flex-col bg-white dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mb-10"
        >
          <span aria-hidden>←</span> All posts
        </Link>

        <Suspense fallback={<p>...Loading</p>}>
          <PostCard searchParams={searchParams} />
        </Suspense>
      </div>
    </article>
  );
}
