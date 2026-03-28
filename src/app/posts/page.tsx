import Link from 'next/link';

import { PostWrapper } from './components/PostsWrapper';
import { Suspense } from 'react';

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = searchParams.then((sp) => sp);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10 sm:mb-12">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
              <span className="text-white font-bold text-lg">BT</span>
            </div>
            <span className="font-bold text-xl text-slate-900 dark:text-white">
              Blog Test
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
            Posts
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl">
            Short articles and notes—same look and feel as the rest of the app.
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <PostWrapper searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
