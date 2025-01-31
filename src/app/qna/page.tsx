'use client';

import React, { useState } from 'react';
import { qnaData } from '@/lib/data';
import Image from 'next/image';
import stat from '../../../public/stat.png';
import clsx from 'clsx';
import Pagination from '@/components/pagination';
import { Suspense } from 'react';
export default function Page() {
  // 현재 열려 있는 Q&A 항목의 번호를 저장하는 상태
  const [qnaToggle, setQnaToggle] = useState<number | null>(null);
  const handleQnaToggle = (itemNo: number) => {
    // 클릭한 항목이 이미 열려 있으면 닫고, 아니면 해당 항목을 열기
    setQnaToggle((prev) => (prev === itemNo ? null : itemNo));
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col h-fit p-10 bg-gray-100 my-10 rounded-2xl">
        <h1 className="text-2xl font-bold mb-4">Q&A</h1>
        <div className="flex flex-col gap-4 p-4">
          {qnaData.map((item) => (
            <ul key={item.no} className="relative">
              {/* Q&A 제목 */}
              <li
                onClick={() => handleQnaToggle(item.no)}
                className="border border-gray-300 rounded-2xl p-4 cursor-pointer flex justify-between bg-white">
                <h2 className="text-2xl font-bold text-black">
                  <span className="text-[#f05b30] pr-2">Q:</span>
                  {item.title}
                </h2>
                <div className="flex justify-end items-center">
                  <Image
                    src={stat}
                    alt="stat"
                    width={30}
                    height={30}
                    className={clsx(
                      'transition-transform duration-300',
                      qnaToggle === item.no ? 'rotate-180' : 'rotate-0',
                    )}
                  />
                </div>
              </li>
              <li
                className={clsx(
                  'border border-gray-300 rounded-2xl p-4 bg-white transition-all duration-300',
                  {
                    'h-0 border-0 p-0': qnaToggle !== item.no,
                  },
                )}>
                <h2
                  className={clsx(
                    'text-lg font-bold text-black ',
                    qnaToggle !== item.no ? 'hidden' : '',
                  )}>
                  <span className="text-[#f05b30] pr-2">A:</span>
                  {item.content}
                </h2>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination totalPages={3} />
        </div>
      </div>
    </Suspense>
  );
}
