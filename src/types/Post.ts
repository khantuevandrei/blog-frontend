export interface Author {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  author: Author;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: Author;
  comments: Comment[];
  total_comments: number;
}

export type Posts = Post[];
