import Api from "@/util/api";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

export default function PostList({ router }) {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    Api.getPostList(router.query.id).then((post) => setPosts({ ...post }));
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        {(() => {
          if (posts) {
            if (Object.keys(posts).length > 0) {
              return Object.keys(posts).map((key) => {
                return (
                  <PostItem
                    key={JSON.stringify(posts[key])}
                    id={router.query.id}
                    post={posts[key]}
                    router={router}
                  />
                );
              });
            } else {
              return (
                <div className="w-full h-[300px] flex justify-center items-center">
                  글이 없습니다.
                </div>
              );
            }
          }
        })()}
      </div>
    </>
  );
}
