import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Login from "./Login";
import Api from "@/util/api";

export default function NavBar() {
  const router = useRouter();
  const [loginShow, setLoginShow] = useState(false);
  const [login, setLogin] = useState(undefined);
  const [main, setMain] = useState(undefined);

  useEffect(() => {
    if (login === undefined) Api.isLogin().then((res) => setLogin(res));
    if (main === undefined) setMain(router.pathname === "/");
  }, []);

  const loginClick = () => {
    if (login) {
      Api.logout().then((res) => router.reload());
    } else {
      setLoginShow(true);
    }
  };

  return (
    <>
      {!login && loginShow && (
        <Login
          loginToggle={() => setLoginShow(false)}
          refresh={() => router.reload()}
        />
      )}
      <div className="w-full flex justify-center items-center text-base">
        <div className="w-4/5 flex justify-start items-center p-3 gap-2">
          <div
            className="bg-black text-white w-6 h-6 flex justify-center items-center font-fmm rounded-md cursor-pointer"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            b
          </div>
          <div
            className="font-fmm text-xl cursor-pointer"
            onClick={() => {
              if (!main) router.push(`/${router.query.id}/posts`);
            }}
          >
            {main ? "Blog" : `${router.query.id}.Blog`}
          </div>
        </div>
        <div className="flex items-center gap-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <div
            className="text-sm font-ng bg-black text-white px-3 py-1 rounded-full cursor-pointer"
            onClick={() => loginClick()}
          >
            {login ? "로그아웃" : "로그인"}
          </div>
          {login && (login !== router.query.id || !main) && (
            <div
              className="text-sm font-ng bg-[#12B886] text-white px-3 py-1 rounded-full cursor-pointer"
              onClick={() =>
                // router.push(`/${login}/posts`, "", { shallow: false })
                (window.location.href = `/${login}/posts`)
              }
            >
              내 블로그
            </div>
          )}
          {login && (
            <>
              <div
                className="text-sm font-ng bg-[#12B886] text-white px-3 py-1 rounded-full cursor-pointer"
                onClick={() =>
                  router.push(
                    { pathname: "/write", query: { id: router.query.id } },
                    "/write"
                  )
                }
              >
                글쓰기
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
