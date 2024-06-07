import PostList from "@/components/PostList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import Login from "@/components/Login";
import { useState } from "react";

export default function Blog() {
  const [loginShow, setLoginShow] = useState(false);
  const router = useRouter();

  return (
    Object.keys(router.query).length > 0 && (
      <div className="relative">
        {loginShow && <Login loginToggle={() => setLoginShow(false)} />}
        <div className="p-3 flex flex-col justify-center items-center gap-6">
          <NavBar router={router} loginToggle={() => setLoginShow(true)} />
          <Header router={router} />
          <PostList router={router} />
        </div>
      </div>
    )
  );
}
