export type postListGetResponse = {
  threadId: string;
  posts: Array<{
    id: string;
    post: string;
  }>;
};
