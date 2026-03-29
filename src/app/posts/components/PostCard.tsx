import { getPost, getPostComments } from '@/app/_libs/services/posts';
import { notFound } from 'next/navigation';
import { CommentCard } from './CommentCard';

type Props = { searchParams: Promise<{ slug: string }> };

export const PostCard = async ({ searchParams }: Props) => {
  const { slug } = await searchParams;
  const [postRes, commentRes] = await Promise.all([
    getPost(slug),
    getPostComments(slug),
  ]);

  const post = postRes.data;
  const comments = commentRes.data;
  if (!post.id) notFound();
  return (
    <>
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
    </>
  );
};
