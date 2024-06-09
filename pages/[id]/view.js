import Api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import Header from "@/components/Header";

export default function view() {
  const [post, setPost] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      Api.getPostList(router.query.id).then((postList) => {
        setPost({ ...postList[router.query.postId] });
      });
    }
  }, [router.query]);

  return (
    Object.keys(post).length > 0 && (
      <div className="p-3 flex flex-col justify-center items-center gap-6">
        <div className="w-3/5 flex flex-col justify-center items-start gap-3">
          <p className="font-ngeb text-4xl mt-7 mb-4">{post.title}</p>
          <div className="text-sm font-ng flex justify-start items-center">
            <p className="font-ngb">{router.query.id}</p>
            <p className="px-2 text-gray-300">|</p>
            <p className="text-gray-700">
              {moment(post.timestamp).format("yyyy년 M월 D일. HH시 mm분")}
            </p>
          </div>
          <hr className="w-full" />
          {post.content.split("\n").map((line) => (
            <p>{line}</p>
          ))}
          <hr className="w-full" />
          <Header router={router} />
        </div>
      </div>
    )
  );
}
