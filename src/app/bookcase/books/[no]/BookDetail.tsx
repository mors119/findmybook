'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { DeleteButton, EditButton } from '@/components/buttons';
import { useParams } from 'next/navigation';
import { Book } from '@/types/definition';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import { getBook } from '@/app/api/apiService';
// 상세보기 페이지
export default function Page() {
  const { isLoggedIn, token } = useAuth();
  const router = useRouter();
  const [isLocation, setIsLocation] = useState(false);
  const [oneBookData, setOneBookData] = useState<Book | null>(null);
  const { no } = useParams();
  useEffect(() => {
    getBook(Number(no)).then((res) => {
      setOneBookData(res.data);
    });
  }, [no]);
  return (
    <div className="w-full p-8 md:p-2">
      <div className=" border border-gray-300 mb-8 flex justify-between p-4 items-center rounded-xl text-black md:mb-2 sm:flex-col md:p-2 md:px-4">
        <div className="text-xl font-bold">작성자: {oneBookData?.writer}</div>
        <div className="text-sm">작성일: {oneBookData?.rigDate}</div>
      </div>
      <div className="max-w-full mx-auto flex gap-8 md:flex-col md:items-center md:gap-2">
        <div className="w-[320px] h-[400px] border border-gray-300 rounded-xl bg-white flex flex-col items-center overflow-hidden md:h-full md:w-fit  ">
          {oneBookData?.image === '' || oneBookData?.image === null ? (
            <Image
              src={'/noImage.jpeg'}
              alt={oneBookData?.title || ''}
              width={320}
              height={400}
              className="w-full h-full object-cover md:w-[200px] md:h-[300px]"
            />
          ) : (
            <Image
              src={`/upload/${oneBookData?.image}`}
              alt={oneBookData?.title || ''}
              width={320}
              height={400}
              className="w-full h-full object-cover md:w-[200px] md:h-[300px]"
            />
          )}
          <button
            onClick={() => setIsLocation(!isLocation)}
            className={clsx(
              'w-full h-1/6 flex items-center justify-center text-black text-2xl font-bold border-gray-300 border-t text-center cursor-pointer transition-all duration-300 md:h-full md:p-1 md:text-base',
              isLocation
                ? 'bg-[#fb5234] text-white hover:bg-[#fb5234]'
                : ' hover:bg-black hover:text-white',
              !oneBookData?.location &&
                isLocation &&
                'text-lg transition-all duration-0 bg-gray-500',
            )}>
            {isLocation
              ? oneBookData?.location
                ? oneBookData?.location
                : '위치 정보를 등록해주세요.'
              : '위치 찾기'}
          </button>
        </div>
        <div className="w-full px-12 py-6 text-black border border-gray-300 rounded-xl lg:px-6 lg:py-2 md:overflow-x-auto ">
          <table className="table-fixed w-full h-full md:w-[600px]">
            <tbody>
              <tr className="text-xl font-bold border-b border-gray-300">
                <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">제목</td>
                <td className="px-4 py-2 lg:px-2 lg:py-1">
                  <div className="break-words">{oneBookData?.title}</div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">저자</td>
                <td className="px-4 py-2 lg:px-2 lg:py-1">
                  <div className="break-words">{oneBookData?.author}</div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                  출판사 / 출판일
                </td>
                <td className="px-4 py-2 lg:px-2 lg:py-1">
                  <div className="break-words">
                    {oneBookData?.publisher}
                    {oneBookData?.publisher && oneBookData?.publishDate && '/'}
                    {oneBookData?.publishDate}
                  </div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                  카테고리
                </td>
                <td className="px-4 py-2 lg:px-2 lg:py-1">
                  <div className="break-words">{oneBookData?.category}</div>
                </td>
              </tr>
              <tr>
                <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">한줄평</td>
                <td className="px-4 py-2 lg:px-2 lg:py-1">
                  <div className="break-words">
                    {oneBookData?.oneline &&
                      '&ldquo;' + oneBookData?.oneline + '&rdquo;'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-full mt-8 md:mt-2">
        <div className="w-full  bg-white border border-gray-300 rounded-xl p-6">
          <div className="w-full  text-black text-xl font-bold mb-4">
            {oneBookData?.review ? '상세 리뷰' : '등록된 리뷰가 없습니다.'}
          </div>
          <div className="w-full text-black text-base p-4 break-words md:p-2">
            {oneBookData?.review}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-4 md:gap-2 mt-4 text-black">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-black font-bold border border-gray-300 px-4 py-2 rounded-md hover:bg-[#fb5234] hover:text-white transition-all duration-300">
          뒤로가기
        </button>
      </div>
      {isLoggedIn && token === oneBookData?.writer && (
        <div className="w-full flex justify-end gap-4 md:gap-2 ">
          <EditButton bookNo={Number(no)} />
          <DeleteButton bookNo={Number(no)} location="/bookcase/books" />
        </div>
      )}
    </div>
  );
}
