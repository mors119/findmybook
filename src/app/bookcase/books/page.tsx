'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EditButton, DeleteButton } from '@/components/buttons';
import Link from 'next/link';
import Pagination from '@/components/pagination';
import { useAuth } from '@/components/AuthContext';
import { getBooks } from '@/app/api/apiService';
import { Book } from '@/types/definition';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const { isLoggedIn, token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [key, setKey] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  useEffect(() => {
    if (token) {
      getBooks(token, currentPage - 1, 5).then((res) => {
        setBooks(res.data.content);
        setTotalPage(res.data.totalPages);
      });
    }
  }, [token, key, currentPage]);

  return (
    <div className="text-black p-12 md:p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">내 책장</h2>
        {isLoggedIn && (
          <Link href="/bookcase/books/addBook">
            <button className="bg-white text-black border border-gray-300 text-xl font-bold rounded-xl px-4 py-2 mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] hover:text-white transition-all duration-300 md:mt-2">
              책 등록
            </button>
          </Link>
        )}
      </div>
      {books.length > 0 ? (
        <>
          <table className="table-fixed w-full h-full">
            <thead className="border-b border-gray-300">
              <tr className="text-xl font-bold md:text-base sm:text-sm">
                <th className="lg:hidden w-1/12 p-4 md:p-2 sm:p-1 ">번호</th>
                <th className="w-1/12 p-4 md:p-2 sm:p-1 sm:w-2/12 ">이미지</th>
                <th className="w-3/12 p-4 md:p-2 sm:p-1 sm:w-2/12">제목</th>
                <th className="sm:hidden w-2/12 p-4">저자</th>
                <th className="lg:hidden w-2/12 p-4 md:p-2 sm:p-1">등록일</th>
                <th className="w-1/12 p-4 md:p-2 sm:p-1">위치</th>
                <th className="w-2/12 p-4 md:p-2 sm:p-1">수정/삭제</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="text-center lg:hidden">{index + 1}</td>
                  <td>
                    <Link href={`/bookcase/books/${book.no}`}>
                      {book.image === '' || book.image === null ? (
                        <Image
                          src={'/noImage.jpeg'}
                          alt={book.title ? book.title : '이미지가 없습니다.'}
                          width={50}
                          height={50}
                          className="w-full h-full object-cover hover:opacity-50"></Image>
                      ) : (
                        <Image
                          src={`/upload/${book.image}`}
                          alt={
                            book.title
                              ? book.title
                              : '이미지를 찾을 수 없습니다.'
                          }
                          width={50}
                          height={50}
                          className="w-full h-full object-cover hover:opacity-50"
                        />
                      )}
                    </Link>
                  </td>
                  <td className="text-xl font-bold sm:text-base hover:text-[#fb5234]">
                    <Link
                      href={`/bookcase/books/${book.no}`}
                      className="w-full h-full">
                      {book.title && book.title}
                    </Link>
                  </td>
                  <td className="sm:hidden">{book.author && book.author}</td>
                  <td className="lg:hidden">{book.rigDate && book.rigDate}</td>
                  <td>{book.location && book.location}</td>
                  <td className="flex justify-center items-center gap-4 h-full md:gap-2 sm:gap-1">
                    {book.no && (
                      <>
                        <EditButton bookNo={book.no} />
                        <DeleteButton bookNo={book.no} setKey={setKey} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <Pagination totalPages={totalPage} />
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-bold">
          등록된 책이 없습니다.
        </div>
      )}
    </div>
  );
};
export default Page;
