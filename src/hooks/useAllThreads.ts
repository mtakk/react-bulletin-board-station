import axios from "axios";
import { useState } from "react";
import { Thread } from "../types/thread";

export const useAllThreads = () => {
  const [threads, setThreads] = useState<Array<Thread>>();
  const [loading, setLoading] = useState(false);
  const getThreads = () => {
    setLoading(true);
    axios
      .get<Array<Thread>>("https://railway.bulletinboard.techtrain.dev/threads")
      .then((res) => setThreads(res.data))
      .catch((res) => console.log("スレッドの取得に失敗しました。" + res))
      .finally(() => setLoading(false));
  };

  return { getThreads, threads, loading };
};
