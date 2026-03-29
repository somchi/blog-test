import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';
import { Post } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const POSTS_PAGE_SIZE = 20;

export const paginatePost = (page: number, posts: Post[]) => {
  const start = (page - 1) * POSTS_PAGE_SIZE;
  const end = start + POSTS_PAGE_SIZE;

  const paginatedPosts = posts.slice(start, end);
  return paginatedPosts;
};

export const hasNextPage = (post: Post[], page: number) => {
  const pages = Math.ceil(post.length / POSTS_PAGE_SIZE);
  let hasNextPage = false;
  if (page < pages) {
    hasNextPage = true;
  }
  return hasNextPage;
};

export const formatPost = (data: Post[], page: number, search?: string) => {
  let paginatedData: Post[];
  if (search) {
    const filter = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    paginatedData = paginatePost(page, filter);
  } else {
    paginatedData = data.length > 0 ? paginatePost(page, data) : data;
  }
  return paginatedData;
};

export const authUser = () => {
  localStorage.setItem('isLoggedin', 'true');
};

export const logUserOut = () => {
  localStorage.removeItem('isLoggedin');
};
