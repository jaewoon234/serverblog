import Api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    Api.isLogin().then((res) => {
      if (!res) router.back();
    });
    if (Object.keys(router.query).length == 0) {
      router.back();
    }
  }, [router.query]);

  return (
    <div className="p-3 flex flex-col justify-center items-center gap-6">
      <div className="w-3/5 flex flex-col justify-center items-start gap-3">
        <p className="font-ngeb text-4xl mt-7 mb-4 border border-solid border-gray-200 p-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          ></input>
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[300px] border border-solid border-gray-200 resize-none p-2"
          placeholder="내용을 입력하세요"
        ></textarea>
        <div className="w-full flex justify-end items-center text-sm text-white gap-2">
          <button
            disabled={title.length == 0 || content.length == 0}
            className="py-1 px-2 flex justify-center items-center bg-green-500 hover:bg-green-600 rounded-sm disabled:bg-gray-400"
            onClick={() => {
              Api.writePost(title, content).then((res) =>
                router.push(`/${router.query.id}/view?postId=${res}`)
              );
            }}
          >
            저장
          </button>
          <button
            className="py-1 px-2 flex justify-center items-center bg-red-500 hover:bg-red-600 rounded-sm"
            onClick={() => {
              router.back();
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
