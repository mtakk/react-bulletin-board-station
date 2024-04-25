import { FC, ReactNode } from "react";
import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

export const Header: FC<Props> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const onClickToTop = () => navigate("/threads");
  const onClickNewThread = () => navigate("/threads/new");

  return (
    <>
      <header className=" bg-green-400 text-white">
        <nav className="flex justify-between container mx-auto items-center p-4">
          <div className=" text-xl" onClick={onClickToTop}>
            掲示板
          </div>
          <a className="underline text-xs" onClick={onClickNewThread}>
            スレッドをたてる
          </a>
        </nav>
      </header>
      {children}
    </>
  );
};
