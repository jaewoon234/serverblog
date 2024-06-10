import PostItem from "@/components/PostItem";
import Api from "@/util/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    Api.getAllPosts().then((p) => {
      setPosts([...p]);
    });
  }, []);
  return (
    <div className="mx-auto w-3/5 mt-7">
      <div className="w-full flex flex-col justify-center items-start">
        <p className="font-ngb text-2xl">최근 작성된 글</p>
        <hr className="w-full my-2" />
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <PostItem
              key={JSON.stringify(post)}
              router={router}
              id={post.owner}
              post={post}
              main={true}
            />
          ))}
        {posts && posts.length == 0 && "작성된 글이 없습니다."}
      </div>
    </div>
  );
}
