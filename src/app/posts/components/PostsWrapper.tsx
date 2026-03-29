import { formatPost, hasNextPage } from '@/app/_libs/utils';
import { PostsPagination } from './PostsPagination';
import { Posts } from './Posts';
import { getPosts } from '@/app/_libs/services/posts';
import { PostsSearch } from './PostSearch';
import { ClearCache } from './ClearCache';

type Props = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export const PostWrapper = async ({ searchParams }: Props) => {
  const { page, search } = await searchParams;
  const response = await getPosts();
  const data = response.data;

  const parsed = page ? parseInt(page) : 1;

  const paginatedData = formatPost(data, parsed, search);

  const nextPage = hasNextPage(search ? paginatedData : data, parsed);

  return (
    <div>
      <ClearCache />
      <PostsSearch defaultSearch={search} />

      {search && (
        <p>
          {paginatedData.length === 0
            ? 'No result found'
            : `${paginatedData.length} posts found`}
        </p>
      )}
      <Posts posts={paginatedData} />
      <PostsPagination
        page={parsed}
        hasNextPage={nextPage}
        postCount={data.length}
      />
    </div>
  );
};
