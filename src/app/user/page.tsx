import React from 'react';

export default function page() {
  return (
    <div className="p-8 w-96 h-full mx-auto border-4 border-gray-300 bg-white rounded-2xl mt-20">
      <div className="text-center text-2xl font-bold  text-[#fb5234]  rounded-t-xl">
        로그인
      </div>
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 items-center pt-6">
            <label className="text-black w-1/3" htmlFor="email">
              이메일
            </label>
            <input
              type="text"
              id="email"
              className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md "
            />
          </div>
          <div className="flex gap-2 items-center mt-4">
            <label className="text-black w-1/3" htmlFor="password">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="max-w-2/3 w-full border-gray-300 border py-2 px-4 text-black rounded-md"
            />
          </div>
          <button className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300">
            Login
          </button>
        </form>
        <div className="flex gap-2 justify-between border-t border-gray-300 pt-4 flex-col">
          <button className="text-sm p-2 text-gray-500 hover:border-">
            회원가입
          </button>
          <button className="text-sm p-2 text-gray-500">
            아이디 찾기 / 비밀번호 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
