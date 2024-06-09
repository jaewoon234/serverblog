import PostList from "@/components/PostList";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Api from "@/util/api";

export default function posts() {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Api.isLogin().then((res) => setLogin(res));
  }, []);

  return (
    <>
      {Object.keys(router.query).length > 0 && (
        <div className="mx-auto w-3/5 p-3 flex flex-col justify-center items-center gap-6">
          <div className="py-10"></div>
          <Header router={router} editable={login} />
          <PostList router={router} />
        </div>
      )}
    </>
  );
}
