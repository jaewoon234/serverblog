import Api from "@/util/api";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function edit() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      Api.getPostList(router.query.id).then((postList) => {
        const value = postList[router.query.postId];
        setPost({ ...value });
        setTitle(value.title);
        setContent(value.content);
      });
    } else router.back();
  }, [router.query]);
  return (
    Object.keys(post).length > 0 && (
      <div className="p-3 flex flex-col justify-center items-center gap-6">
        <div className="w-3/5 flex flex-col justify-center items-start gap-3">
          <p className="font-ngeb text-4xl mt-7 mb-4 border border-solid border-gray-200 p-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            ></input>
          </p>
          <div className="w-full text-sm font-ng flex justify-between items-center">
            <div className="flex items-center">
              <p className="font-ngb">{router.query.id}</p>
              <p className="px-2 text-gray-300">|</p>
              <p className="text-gray-700">
                {moment(post.timestamp).format("yyyy년 M월 D일. HH시 mm분")}
              </p>
            </div>
          </div>
          <hr className="w-full" />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[300px] border border-solid border-gray-200 resize-none p-2"
            placeholder="내용을 입력하세요"
          ></textarea>
          <div className="w-full flex justify-end items-center text-sm text-white gap-2">
            <button
              className="py-1 px-2 flex justify-center items-center bg-green-500 hover:bg-green-600 rounded-sm"
              onClick={() => {
                Api.editPost(
                  router.query.id,
                  router.query.postId,
                  title,
                  content
                ).then((res) =>
                  router.push(
                    `/${router.query.id}/view?postId=${router.query.postId}`
                  )
                );
              }}
            >
              저장
            </button>
            <button
              className="py-1 px-2 flex justify-center items-center bg-red-500 hover:bg-red-600 rounded-sm"
              onClick={() => {
                router.push(
                  `/${router.query.id}/view?postId=${router.query.postId}`
                );
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    )
  );
}
