import { getPost, getPostComments } from '@/app/_libs/services/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CommentCard } from '../components/CommentCard';

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage(props: Props) {
  const { slug } = await props.params;

  const [postRes, commentRes] = await Promise.all([
    getPost(slug),
    getPostComments(slug),
  ]);

  const post = postRes.data;
  const comments = commentRes.data;
  if (!post.id) notFound();

  // const paragraphs = post.content.split('\n\n');

  return (
    <article className="min-h-screen flex flex-col bg-white dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mb-10"
        >
          <span aria-hidden>←</span> All posts
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {post.body}
          </p>
        </header>

        <div className="text-base sm:text-lg">
          <h2 className="font-semibold">Comments</h2>
          {comments.map((comment, ind) => (
            <CommentCard key={ind} comment={comment} />
          ))}
        </div>
      </div>
    </article>
  );
}
