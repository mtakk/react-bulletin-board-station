import axios from "axios";
import { PostData } from "../types/postData";

export const useNewPost = () => {
  const postPost = async (props: Omit<PostData, "id">) => {
    const threadId = props.threadId;
    axios
      .post<Pick<PostData, "post">>(
        `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
        { post: props.post }
      )
      .then((res) => console.log(res))
      .catch((res) => console.log("投稿の登録に失敗しました。" + res))
      .finally(() => console.log("新規投稿処理終了"));
  };
  return { postPost };
};
