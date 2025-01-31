import Link from 'next/link';
import React from 'react';
import { loginRequest } from '@/app/api/apiService';
import { useAuth } from '@/components/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;
    loginRequest(email, password)
      .then((response) => {
        if (response.data.state === 'success') {
          alert('로그인 성공');
          login(response.data.email);
        } else {
          alert('아이디 또는 비밀번호가 틀렸습니다.');
        }
      })
      .catch(() => {
        alert('로그인 실패');
      });
  };
  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col gap-4 p-4" onSubmit={handleLogin}>
        <div className="flex gap-2 items-center pt-6">
          <label className="text-black w-1/3" htmlFor="email">
            이메일
          </label>
          <input
            type="text"
            id="email"
            className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div className="flex gap-2 items-center mt-4">
          <label className="text-black w-1/3" htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="max-w-2/3 w-full border-gray-300 border py-2 px-4 text-black rounded-md focus:outline-none"
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <button className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300">
          Login
        </button>
      </form>
      <div className="flex gap-2 justify-between border-t border-gray-300 pt-4 flex-col items-center">
        <Link
          href="/user/signup"
          className="text-sm p-2 text-gray-500 hover:border-gray-500 hover:bg-[#fb5234] hover:text-white transition-all duration-300 rounded-md">
          회원가입
        </Link>
        <Link
          href="/user/findUser"
          className="text-sm p-2 text-gray-500 hover:border-gray-500 hover:bg-[#fb5234] hover:text-white transition-all duration-300 rounded-md">
          아이디 찾기 / 비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
