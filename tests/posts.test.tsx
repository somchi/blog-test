import { Posts } from '@/app/posts/components/Posts';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getPosts } from '@/app/_libs/services/posts';

jest.mock('next/cache', () => ({
  cacheTag: jest.fn(),
  __esModule: true,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([{ id: 1, title: 'Test', body: 'Body' }]),
  })
) as jest.Mock;

describe('Test for Posts component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const data = [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      userId: 1,
      id: 5,
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    },
  ];

  test('fetches posts', async () => {
    const posts = await getPosts();
    expect(posts.data).toHaveLength(1);
    expect(posts.message).toBe('request successful');
    expect(posts.data[0].body).toBe('Body');
  });

  test('renders post title and body', async () => {
    render(<Posts posts={data} />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(2);
    const firstHeading = headings[0];
    expect(firstHeading).toHaveTextContent('sunt');
  });
});
