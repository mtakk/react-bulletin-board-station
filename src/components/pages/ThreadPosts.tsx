import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useThreadPosts } from "../../hooks/useThreadPosts";
import { PostData } from "../../types/postData";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNewPost } from "../../hooks/useNewPost";

export const ThreadPosts = () => {
  const params = useParams();
  const threadId = params.threadId as string;
  const { getThreadPosts, posts, loading } = useThreadPosts();

  useEffect(() => {
    getThreadPosts(threadId);
  }, []);

  const { register, handleSubmit } = useForm<Omit<PostData, "id">>();

  const { postPost } = useNewPost();
  const onSubmitPost: SubmitHandler<Omit<PostData, "id">> = async (data) => {
    data.threadId = threadId;
    await postPost(data);
    await getThreadPosts(threadId);

    let pollCount = 0;
    const maxPollCount = 2;
    const pollInterval = 5000;

    const pollData = async () => {
      if (pollCount >= maxPollCount) {
        console.log("リトライが終了しました。");
        return;
      }
      console.log("リトライ中...");
      await getThreadPosts(threadId);
      pollCount++;
      setTimeout(pollData, pollInterval);
    };
    pollData();
  };

  return (
    <main className=" flex justify-around">
      <div className=" sm:w-96 w-4/5">
        <h1 className="text-3xl font-bold max-w-full h-24 flex items-center">
          TechTrainってどうなの？
        </h1>
        {loading ? (
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div>
            {posts?.map((post) => (
              <div
                key={post.id}
                className=" bg-white h-20 text-xs mb-4 px-4 flex items-center"
              >
                {post.post}
              </div>
            ))}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmitPost)}
        className=" mt-24 flex flex-col sm:w-80"
      >
        <textarea
          placeholder="投稿しよう！"
          className="p-4 h-32 mb-8"
          wrap="hard"
          {...register("post", {
            required: "投稿を入力してください。",
            maxLength: {
              value: 100,
              message: "100文字以下で入力してください",
            },
          })}
        />
        <button
          type="submit"
          className="px-8 py-1 text-white bg-green-400 rounded-md h-14 text-lg"
        >
          投稿
        </button>
      </form>
    </main>
  );
};
