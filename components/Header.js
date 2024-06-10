import Api from "@/util/api";
import { useEffect, useState } from "react";

const svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-3 text-gray-500 cursor-pointer"
  >
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
  </svg>
);

export default function Header({ router, editable = false }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [chg, setChg] = useState(false);
  const [nameChg, setNameChg] = useState(false);
  const [eDesc, setEDesc] = useState("");
  const [eName, setEName] = useState("");

  useEffect(() => {
    Api.getBlogData(router.query.id).then((data) => {
      setName(data.name);
      setDesc(data.desc);
    });
  }, []);

  const changeDesc = () => {
    setChg(true);
    setNameChg(false);
    setEDesc(desc);
  };

  const changeName = () => {
    setNameChg(true);
    setChg(false);
    setEName(name);
  };

  const saveDesc = () => {
    Api.changeDesc(router.query.id, eDesc).then((res) => {
      if (res) {
        setChg(false);
        setDesc(eDesc);
        setEDesc("");
      }
    });
  };

  const saveName = () => {
    Api.changeName(router.query.id, eName).then((res) => {
      if (res) {
        setNameChg(false);
        setName(eName);
        setEName("");
      }
    });
  };

  return (
    <>
      <div className="w-full flex justify-start items-center pb-3 gap-5">
        <div className="p-3 rounded-full bg-gray-200 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-16 md:size-28"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <div className="w-full flex flex-col justify-center items-start">
          {(() => {
            if (nameChg) {
              return (
                <div className="flex justify-center items-center w-full font-ng">
                  <div className="w-[90%] border border-solid border-gray-200">
                    <input
                      className="w-full px-1 font-ngb text-2xl"
                      value={eName.length > 0 ? eName : name}
                      onChange={(e) => setEName(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-[10%] bg-[#12B886] text-white">
                    <button
                      className="w-full flex justify-center items-center py-1 text-sm"
                      onClick={() => saveName()}
                    >
                      저장
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex items-center gap-2 text-2xl font-ngb">
                  <p>{name}</p>
                  {editable && <div onClick={() => changeName()}>{svg}</div>}
                </div>
              );
            }
          })()}
          {(() => {
            if (chg) {
              return (
                <div className="flex justify-center items-center w-full font-ng">
                  <div className="w-[90%] border border-solid border-gray-200">
                    <input
                      className="w-full px-1"
                      value={eDesc.length > 0 ? eDesc : desc}
                      onChange={(e) => setEDesc(e.target.value)}
                    ></input>
                  </div>
                  <div className="w-[10%] bg-[#12B886] text-white">
                    <button
                      className="w-full flex justify-center items-center py-1 text-sm"
                      onClick={() => saveDesc()}
                    >
                      저장
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex items-center gap-2 text-base">
                  <p>{desc}</p>
                  {editable && <div onClick={() => changeDesc()}>{svg}</div>}
                </div>
              );
            }
          })()}
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
}
