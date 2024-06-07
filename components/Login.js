export default function Login({ loginToggle }) {
  return (
    <div className="relative animate-fade">
      <div className="absolute w-screen h-screen bg-white opacity-70"></div>
      <div className="absolute w-screen h-screen flex justify-center items-center">
        <div className="absolute w-[350px] h-[300px] bg-white shadow-md p-4 flex flex-col justify-between">
          <div>
            <div
              className="flex items-center justify-end text-gray-500"
              onClick={() => loginToggle()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-ngb text-xl mt-7">로그인</p>
            <p className="font-ng text-base mt-3 text-gray-600">
              이메일로 로그인
            </p>
            <form className="flex border border-solid border-gray-200 font-ng text-sm mt-2">
              <input
                className="w-4/5 px-3 py-2"
                placeholder="이메일을 입력하세요."
              ></input>
              <input
                className="w-1/5 bg-[#12B886] text-white"
                type="submit"
                value="로그인"
              />
            </form>
          </div>
          <div className="flex items-center justify-end gap-1 font-ng text-sm text-[#12B886]">
            <p>아직 회원이 아니신가요?</p>
            <p className="font-ngb">회원가입</p>
          </div>
        </div>
      </div>
    </div>
  );
}
