import { PostComment } from '@/app/_libs/types';

export const CommentCard = ({ comment }: { comment: PostComment }) => {
  return (
    <div>
      <p className="text-slate-700 dark:text-slate-300 mt-5 last:mb-0 leading-relaxed whitespace-pre-wrap">
        {comment.body}
      </p>
      <div className="grid md:flex gap-2 text-sm font-semibold">
        <p>By: {comment.name} </p>
        <p> Email: {comment.email}</p>
      </div>
    </div>
  );
};
