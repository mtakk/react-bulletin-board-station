import { useEffect } from "react";
import { useAllThreads } from "../../hooks/useAllThreads";
import { useNavigate } from "react-router-dom";

export const Threads = () => {
  const { getThreads, threads, loading } = useAllThreads();

  useEffect(() => getThreads(), []);

  const navigate = useNavigate();
  const onClickThread = (threadId: string) => {
    navigate(`/threads/${threadId}/posts`, { state: { threadId } });
  };

  return (
    <main className=" flex justify-center">
      <div className=" sm:w-96 w-4/5">
        <h1 className="text-3xl font-bold max-w-full h-24 flex items-center">
          新着スレッド
        </h1>
        {loading ? (
          <div className="flex justify-center" aria-label="読み込み中">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        ) : (
          <div>
            {threads?.map((thread) => (
              <div
                key={thread.id}
                className=" bg-white border border-gray-400 rounded-sm px-2 h-12 text-lg"
                onClick={() => onClickThread(thread.id)}
              >
                {thread.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
