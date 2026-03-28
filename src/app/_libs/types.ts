export interface AuthData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ResponseSchema<T> {
  status: number;
  message: string;
  data: T;
}
