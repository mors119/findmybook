'use client';
// 레이아웃을 사용하는 이점은 탐색 시 페이지 구성 요소만 업데이트되고 레이아웃은 다시 렌더링되지 않는다.
// UI를 공유할 수 있다.
import { Suspense } from 'react';
import LoadingFallback from '@/components/loadingFallback';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-5/6 mt-6 md:mt-2 ">
      <div className="border border-gray-300 w-full bg-white rounded-2xl overflow-y-auto md:w-full md:h-full">
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
      </div>
    </div>
  );
}
