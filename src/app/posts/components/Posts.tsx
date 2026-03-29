import { Post } from '@/app/_libs/types';
import Link from 'next/link';

export const Posts = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="group block rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/90 dark:bg-slate-900/35 backdrop-blur-sm p-5 sm:p-6 shadow-sm transition-all hover:border-purple-500/40 dark:hover:border-purple-500/30 hover:shadow-md hover:shadow-purple-950/10 dark:hover:bg-slate-900/55"
            >
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                {post.body}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-purple-700 dark:text-purple-400 group-hover:gap-2 transition-all">
                Read post
                <span
                  className="inline-block transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
