import Api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import Header from "@/components/Header";

export default function view() {
  const [post, setPost] = useState({});
  const [login, setLogin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      Api.getPostList(router.query.id).then((postList) => {
        setPost({ ...postList[router.query.postId] });
      });
    }
  }, [router.query]);

  useEffect(() => {
    Api.isLogin().then((res) => setLogin(res));
  });

  const delPost = () => {
    if (confirm("삭제하겠습니까?")) {
      Api.removePost(router.query.id, router.query.postId).then((r) =>
        router.back()
      );
    }
  };

  return (
    Object.keys(post).length > 0 && (
      <div className="p-3 flex flex-col justify-center items-center gap-6">
        <div className="w-3/5 flex flex-col justify-center items-start gap-3">
          <p className="font-ngeb text-4xl mt-7 mb-4">{post.title}</p>
          <div className="w-full text-sm font-ng flex justify-between items-center">
            <div className="flex items-center">
              <p className="font-ngb">{router.query.id}</p>
              <p className="px-2 text-gray-300">|</p>
              <p className="text-gray-700">
                {moment(post.timestamp).format("yyyy년 M월 D일. HH시 mm분")}
              </p>
              {post.edit && (
                <>
                  <p className="px-1 text-gray-300">|</p>
                  <p className="text-gray-700 text-xs">(수정됨)</p>
                </>
              )}
            </div>
            {router.query.id === login && (
              <div className="flex justify-center items-center gap-1 font-ng">
                <p
                  className="cursor-pointer"
                  onClick={() => {
                    router.push(
                      {
                        pathname: "/edit",
                        query: { id: login, postId: post.id },
                      },
                      "/edit"
                    );
                  }}
                >
                  수정
                </p>
                <p className="text-gray-400">|</p>
                <p className="cursor-pointer" onClick={() => delPost()}>
                  삭제
                </p>
              </div>
            )}
          </div>
          <hr className="w-full" />
          {post.content.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
          <hr className="w-full" />
          <Header router={router} editable={login} />
        </div>
      </div>
    )
  );
}
