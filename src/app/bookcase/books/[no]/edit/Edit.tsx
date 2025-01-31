'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextArea from '@/lib/slate';
import Dropzone from '@/lib/dorpzone';
import Input from '@/components/input';
import { updateBook, updateFile, deleteFile } from '@/app/api/apiService';
import { useParams } from 'next/navigation';
import { getBook } from '@/app/api/apiService';
import { Book } from '@/types/definition';
import { useAuth } from '@/components/AuthContext';

export default function Page() {
  const router = useRouter();
  const { token } = useAuth();
  const { no } = useParams();
  const [bookData, setBookData] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await getBook(Number(no));
        setBookData(res.data);
        sessionStorage.setItem('SlateText', res.data.review);
      } catch (error) {
        console.error('책 정보 로딩 실패:', error);
        alert('책 정보를 불러오는데 실패했습니다.');
        router.back();
      } finally {
        setLoading(false); // 로딩 완료
      }
    };
    fetchBookData();
  }, [no, router]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (formData.get('title') === '') {
      alert('책 이름을 입력해 주세요.');
      return;
    }

    // 파일 업로드
    if (files[0]) {
      const fileFormData = new FormData();
      fileFormData.append('file', files[0]);

      try {
        const res = await updateFile(Number(no), fileFormData); // 파일 업로드 API 호출
        formData.append('image', res.data);
        if (
          bookData?.image !== res.data &&
          bookData?.image !== null &&
          bookData?.image !== undefined
        ) {
          await deleteFile(bookData.image);
        }
      } catch (error) {
        console.error('파일 업로드 실패:', error);
        return;
      }
    }

    try {
      const review = sessionStorage.getItem('SlateText') ?? '';

      formData.append('review', review);
      const res = await updateBook(formData); // 책 업데이트 API 호출
      if (res.data === 'success') {
        alert('책 정보 수정 완료');
        sessionStorage.removeItem('SlateText');
        router.push('/bookcase/books');
      }
    } catch (error) {
      console.error('책 정보 수정 실패:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="text-xl font-bold">로딩 중...</div>
      </div>
    );
  }
  const handleClose = () => {
    sessionStorage.removeItem('SlateText');
    router.back();
  };
  return (
    <div className="w-full p-8 md:p-2">
      <div className="border border-gray-300 mb-8 flex justify-between p-4 items-center rounded-xl text-black md:mb-2 sm:flex-col md:p-2 md:px-4">
        <div className="text-xl font-bold">책 정보 수정</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-full mx-auto flex gap-8 md:flex-col md:items-center md:gap-2">
          <div className="w-[420px] h-[400px] border border-gray-300 rounded-xl bg-white flex flex-col items-center overflow-hidden md:h-full md:w-fit">
            <Dropzone
              currentImage={bookData?.image}
              onFilesChange={handleFileChange}
            />
          </div>
          <div className="w-full px-12 py-6 text-black border border-gray-300 rounded-xl lg:px-6 lg:py-2 md:overflow-x-auto">
            <table className="table-fixed w-full h-full md:w-[600px]">
              <tbody>
                <tr className="text-xl font-bold border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    책 이름
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <input type="hidden" name="writer" value={token || ''} />
                    <input type="hidden" name="no" value={no} />
                    <Input
                      name="title"
                      value={bookData?.title ?? ''}
                      placeholder="책 이름을 입력해 주세요."
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">저자</td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      name="author"
                      value={bookData?.author ?? ''}
                      placeholder="저자를 입력해 주세요."
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    출판사
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      name="publisher"
                      value={bookData?.publisher ?? ''}
                      placeholder="출판사를 입력해 주세요."
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    출판일
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      placeholder="출판일을 입력해주세요."
                      value={bookData?.publishDate ?? ''}
                      name="publishDate"
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    카테고리
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      name="category"
                      value={bookData?.category ?? ''}
                      placeholder="카테고리를 입력해 주세요."
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">위치</td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      placeholder="위치를 입력해주세요."
                      value={bookData?.location ?? ''}
                      name="location"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    한줄평
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      name="oneLineReview"
                      value={bookData?.oneline ?? ''}
                      placeholder="간단한 리뷰를 입력해 주세요."
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full h-full mt-8 md:mt-2">
          <div className="w-full bg-white border border-gray-300 rounded-xl p-6">
            <div className="w-full text-black text-xl font-bold mb-4">
              상세 리뷰
            </div>
            <TextArea
              currentText={
                sessionStorage.getItem('SlateText')
                  ? sessionStorage.getItem('SlateText')
                  : ''
              }
            />
          </div>
        </div>
        <div className="w-full flex justify-end gap-4 md:gap-2 mt-4 text-black">
          <button
            type="submit"
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-[#fb5234] hover:text-white transition-all duration-300">
            저장하기
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-[#fb5234] hover:text-white transition-all duration-300">
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
