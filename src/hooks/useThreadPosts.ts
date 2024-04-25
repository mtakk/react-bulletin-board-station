import axios from "axios";
import { useState } from "react";
import { postListGetResponse } from "../types/postListGetResponse";
import { PostData } from "../types/postData";

export const useThreadPosts = () => {
  const [posts, setPosts] = useState<Array<Omit<PostData, "threadId">>>();
  const [loading, setLoading] = useState(false);
  const getThreadPosts = async (threadId: string) => {
    setLoading(true);
    axios
      .get<postListGetResponse>(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`
      )
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((res) => console.log("投稿の取得に失敗しました。" + res))
      .finally(() => setLoading(false));
  };
  return { getThreadPosts, posts, loading };
};
