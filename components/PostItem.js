import moment from "moment";

const PostItem = ({ router, id, post, main = false }) => {
  const viewPost = () => {
    if (main) window.location.href = `/${id}/view?postId=${post.id}`;
    else router.push(`/${id}/view?postId=${post.id}`);
  };
  return (
    <>
      <div
        className="p-3 w-full flex flex-col justify-center items-start gap-1 hover:bg-gray-100 cursor-pointer"
        onClick={() => viewPost()}
      >
        <p className="font-ngb text-xl">{post.title}</p>
        <p className="font-ng text-sm text-gray-700">
          {(() => {
            if (post.content.length > 100) {
              return post.content.substr(0, 100) + "...";
            } else return post.content;
          })()}
        </p>
        <div className="w-full flex items-center gap-2 text-gray-400 font-ng text-2sm">
          <p>{moment(post.timestamp).format("yyyy년 M월 D일. HH시 mm분")}</p>
          {/*<p>|</p>
          <div className="flex items-center justify-center gap-1 cursor-pointer">
            {(() => {
              if (post.likes.includes(id)) {
                return (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-red-500"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    <p className="text-red-500">{post.likes.length}</p>
                  </>
                );
              } else {
                return (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <p>{post.likes.length}</p>
                  </>
                );
              }
            })()}
          </div>*/}

          <p>{}</p>
        </div>
      </div>
      <hr className="w-full my-2" />
    </>
  );
};

export default PostItem;
