import axios from "axios";
import { useCallback, useState } from "react";
import { Thread } from "../types/thread";

export const useNewThread = () => {

    const [loading, setLoading] = useState(false);
    const postThreads = useCallback((props: Omit<Thread, 'id'>) => {
        axios.post("https://railway.bulletinboard.techtrain.dev/threads", props)
        .then((res) => console.log(res))
        .catch((res) => console.log("スレッドの登録に失敗しました。"+ res))
        .finally(() => console.log("新規スレッド登録終了"));
    }, []);
    return { postThreads};
};
