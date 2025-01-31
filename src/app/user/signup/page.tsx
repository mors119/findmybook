'use client';
import React, { useState, useRef } from 'react';
import { MainButton } from '@/components/buttons';
import { checkEmail } from '@/app/api/apiService';
import { Postcode } from '@/app/api/mapApi';
import { signup } from '@/app/api/apiService';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUserName] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleEmailCheck = () => {
    checkEmail(email).then((response) => {
      if (response.data === true) {
        alert('이미 존재하는 이메일입니다.');
        setEmail('');
        emailInputRef.current?.focus();
      } else {
        alert('사용 가능한 이메일입니다.');
        setEmailCheck(true);
        passwordInputRef.current?.focus();
      }
    });
  };

  const handlePasswordCheck = () => {
    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      passwordInputRef.current?.focus();
    }
    if (password !== '' && password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      passwordInputRef.current?.focus();
    } else if (password === passwordCheck && password !== '') {
      alert('비밀번호가 일치합니다.');
    }
  };

  const handleSignup = () => {
    if (
      email === '' ||
      password === '' ||
      passwordCheck === '' ||
      phone === '' ||
      username === '' ||
      birth === '' ||
      address === '' ||
      detailAddress === ''
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (emailCheck === false) {
      alert('이메일 인증을 해주세요.');
      return;
    }
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (phone.length !== 11) {
      alert('휴대폰번호는 11자리로 입력해주세요.');
      return;
    }
    if (birth === '') {
      alert('생년월일을 입력해주세요.');
      return;
    }
    if (address === '') {
      alert('주소를 입력해주세요.');
      return;
    }
    if (detailAddress === '') {
      alert('상세주소를 입력해주세요.');
      return;
    }

    signup(email, password, phone, username, birth, address, detailAddress);
    alert('회원가입이 완료되었습니다.');
    router.push('/');
  };

  return (
    <div className="text-black border-2 border-gray-300 rounded-2xl w-[500px] mx-auto mt-10 p-8 bg-white sm:p-2 sm:w-full sm:mt-0">
      <h1 className="text-center text-2xl font-bold mt-4 sm:mt-2">회원가입</h1>
      <form className="flex flex-col gap-4 p-4 sm:p-2" action={handleSignup}>
        <div>
          <label className="text-black w-1/3" htmlFor="email">
            이메일{' '}
            <span className="text-sm text-[#fb5234]">
              (이메일은 아이디로 사용됩니다.)
            </span>
          </label>
          <div className="flex">
            <input
              ref={emailInputRef}
              type="email"
              id="email"
              className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              className="w-1/3 bg-black text-white rounded-md ml-2 hover:bg-[#fb5234] transition-all duration-300"
              onClick={handleEmailCheck}>
              이메일 확인
            </button>
          </div>
        </div>
        <div>
          <label className="text-black w-1/3" htmlFor="password">
            비밀번호
          </label>
          <input
            ref={passwordInputRef}
            type="password"
            className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
            placeholder="사용할 비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-black w-1/3" htmlFor="password">
            비밀번호 확인
          </label>
          <div className="flex">
            <input
              type="password"
              className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
              placeholder="비밀번호를 다시 입력해주세요."
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              required
            />
            <button
              onClick={handlePasswordCheck}
              type="button"
              className="w-1/3 bg-black text-white rounded-md ml-2 hover:bg-[#fb5234] transition-all duration-300">
              비밀번호 확인
            </button>
          </div>
        </div>
        <div>
          <label>휴대폰번호 (- 없이 입력해주세요.)</label>
          <div className="flex">
            <input
              type="text"
              ref={phoneInputRef}
              className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
              placeholder="휴대폰번호를 입력해주세요."
              value={phone}
              maxLength={11}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            {/* <button
              type="button"
              className="w-1/3 bg-black text-white rounded-md ml-2 hover:bg-[#fb5234] transition-all duration-300">
              인증번호 발송
            </button> */}
          </div>
        </div>
        <div>
          <label>이름</label>
          <input
            type="text"
            className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
            placeholder="이름을 입력해주세요."
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>생년월일 (8자리)</label>
          <input
            type="date"
            className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
            placeholder="생년월일 8자리를 입력해주세요. ex) 19900101"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
            maxLength={8}
          />
        </div>
        <div>
          <label>주소</label>
          <div className="flex">
            <input
              type="text"
              className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234] mb-2"
              placeholder="주소를 입력해주세요."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex">
            <input
              type="text"
              className="max-w-2/3 w-full border border-gray-300 py-2 px-4 text-black rounded-md focus:outline-none focus:border-[#fb5234]"
              placeholder="상세 주소를 입력해주세요."
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
            />
            <Postcode setAddress={setAddress} />
          </div>
        </div>
        <button className="bg-black text-white p-2 rounded-md mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300">
          회원가입
        </button>
        <MainButton />
      </form>
    </div>
  );
}
