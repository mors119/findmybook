'use client';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { findEmail, checkPassCord, sendEmail } from '@/app/api/apiService';

export default function Page() {
  const [email, setEmail] = useState('');
  const [sendedEmail, setSendedEmail] = useState('');
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const [passCordOn, setPassCordOn] = useState(false);
  useEffect(() => {
    userNameInputRef.current?.focus();
  }, []);
  // 아이디 찾기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userName = (form.elements.namedItem('userName') as HTMLInputElement)
      .value;
    const birth = (form.elements.namedItem('birth') as HTMLInputElement).value;
    findEmail(userName, birth)
      .then((response) => {
        setEmail(response.data);
      })
      .catch(() => {
        alert('존재하지 않는 회원입니다.');
      });
  };
  // 비밀번호 찾기
  const handleFindPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (email.includes('@') === false) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    setSendedEmail(email);
    sendEmail(email);
    setPassCordOn(true);
  };
  // 인증번호 확인
  const handlePassCordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const passCord = (form.elements.namedItem('passCord') as HTMLInputElement)
      .value;
    checkPassCord(passCord, email)
      .then((response) => {
        if (response.data === true) {
          alert(
            '인증번호가 일치합니다. \n 인증번호는 임시 비밀번호로 설정됩니다.',
          );
          setPassCordOn(false);
        } else {
          alert('인증번호가 일치하지 않습니다.');
        }
      })
      .catch(() => {
        alert('인증번호가 일치하지 않습니다.');
      });
  };
  return (
    <div className="flex flex-col gap-4 w-[500px] mx-auto border border-gray-300 p-8 bg-white rounded-xl mt-20 sm:mt-0 sm:p-4 sm:w-full">
      <h1 className="font-bold text-[#fb5234] text-center py-4 text-2xl ">
        아이디 / 비밀번호 찾기
      </h1>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg text-black text-center">
          아이디(이메일) 찾기
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <label className="text-black">이름</label>
          <input
            ref={userNameInputRef}
            type="text"
            placeholder="이름"
            name="userName"
            className="border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
          />
          <label className="text-black">생년월일</label>
          <input
            type="date"
            placeholder="생년월일"
            name="birth"
            className="border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300">
            아이디 찾기
          </button>
          {email !== '' && (
            <p className="text-black w-56 text-center border border-gray-300 p-2 rounded-md mt-4 text-lg">
              {email}
            </p>
          )}
        </form>
      </div>
      <div className="flex flex-col gap-2 mt-4 border-t border-gray-300 pt-4">
        <h2 className="font-bold text-lg text-black text-center">
          비밀번호 찾기
        </h2>
        <form className="flex flex-col gap-2" onSubmit={handleFindPassword}>
          <label className="text-black">이메일</label>
          <input
            type="email"
            placeholder="이메일"
            name="email"
            className="border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300">
            비밀번호 찾기
          </button>
        </form>
        {passCordOn && (
          <div className="flex flex-col gap-2">
            <form
              className="flex flex-col gap-2"
              onSubmit={handlePassCordSubmit}>
              <input type="hidden" name="email" value={sendedEmail} />
              <label className="text-black">
                인증번호 (인증완료 후 인증번호는 임시 비밀번호로 설정됩니다.)
              </label>
              <input
                type="text"
                placeholder="메일(아이디)로 전송된 인증번호를 입력해주세요."
                className="border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
                name="passCord"
              />
              <button
                type="submit"
                className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300">
                인증번호 확인
              </button>
            </form>
          </div>
        )}

        <Link
          href="/"
          className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300 text-center">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
