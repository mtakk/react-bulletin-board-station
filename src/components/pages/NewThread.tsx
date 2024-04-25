import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";
import { Thread } from "../../types/thread";
import { useNewThread } from "../../hooks/useNewThread";

export const NewThread = () => {
  const navigate = useNavigate();
  const onClickToTop = () => navigate("/threads");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Thread, "id">>();

  const { postThreads } = useNewThread();
  const onSubmitThread: SubmitHandler<Omit<Thread, "id">> = (data) =>
    postThreads(data);

  return (
    <main className=" flex justify-center">
      <div className=" sm:w-96 w-4/5">
        <h1 className="text-3xl font-bold max-w-full h-24 flex items-center">
          スレッド新規作成
        </h1>
        <form
          onSubmit={handleSubmit(onSubmitThread)}
          className=" w-full py-6 my-16"
        >
          <input
            type="text"
            placeholder="スレッドタイトル"
            className="w-full px-2 py-4 mb-8 rounded-sm"
            {...register("title", {
              required: "スレッドタイトルを入力してください。",
              maxLength: {
                value: 20,
                message: "20文字以下で入力してください",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <p className=" text-red-500 text-xs">{message}</p>
            )}
          />
          <div className="flex justify-between">
            <a className=" text-blue-600 underline m-2" onClick={onClickToTop}>
              TOPに戻る
            </a>
            <button
              type="submit"
              className="px-8 py-1 text-white bg-green-400 rounded-md"
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
