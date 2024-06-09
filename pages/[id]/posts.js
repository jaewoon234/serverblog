import PostList from "@/components/PostList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";

export default function posts() {
  const router = useRouter();

  return (
    <>
      {Object.keys(router.query).length > 0 && (
        <div className="mx-auto w-3/5 p-3 flex flex-col justify-center items-center gap-6">
          <div className="py-10"></div>
          <Header router={router} />
          <PostList router={router} />
        </div>
      )}
    </>
  );
}
