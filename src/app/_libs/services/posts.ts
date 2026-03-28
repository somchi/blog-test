import { cacheTag, revalidateTag } from 'next/cache';
import { Post, PostComment, ResponseSchema } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getPosts = async (): Promise<ResponseSchema<Post[]>> => {
  'use cache';
  cacheTag('posts');
  let result: ResponseSchema<Post[]>;
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    const data = await res.json();

    if (res.status === 200) {
      result = { status: res.status, message: 'request successful', data };
    } else {
      result = {
        status: res.status,
        message: 'request unsuccessful',
        data: [],
      };
    }
    return result;
  } catch (error) {
    const err = error as Error;
    result = { status: 400, message: err.message, data: [] };
    return result;
  }
};

export const getPost = async (
  postId: string
): Promise<ResponseSchema<Post>> => {
  'use cache';
  cacheTag(`post-${postId}`);
  let result: ResponseSchema<Post>;
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}`);
    const data = await res.json();

    if (res.status === 200) {
      result = { status: res.status, message: 'request successful', data };
    } else {
      result = {
        status: res.status,
        message: 'request unsuccessful',
        data: {} as Post,
      };
    }
    return result;
  } catch (error) {
    const err = error as Error;
    result = { status: 400, message: err.message, data: {} as Post };
    return result;
  }
};

export const getPostComments = async (
  postId: string
): Promise<ResponseSchema<PostComment[]>> => {
  'use cache';
  cacheTag(`comments-${postId}`);
  let result: ResponseSchema<PostComment[]>;
  try {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);

    const data = await res.json();
    if (res.status === 200) {
      result = { status: res.status, message: 'request successful', data };
    } else {
      result = {
        status: res.status,
        message: 'request unsuccessful',
        data: [],
      };
    }
    return result;
  } catch (error) {
    const err = error as Error;
    result = { status: 400, message: err.message, data: [] };
    return result;
  }
};
