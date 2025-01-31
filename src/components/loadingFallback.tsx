'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 로딩 컴포넌트
export default function LoadingFallback() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(5); // 5초 카운트다운

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.back(); // 5초 뒤 이전 페이지로 돌아감
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black font-bold">
      <p className="text-lg font-semibold mb-4">Loading... Please wait</p>
      <p className="text-sm">
        Returning to the previous page in {timeLeft} seconds
      </p>
    </div>
  );
}
