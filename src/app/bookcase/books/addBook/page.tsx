'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextArea from '@/lib/slate';
import Dropzone from '@/lib/dorpzone';
import Input from '@/components/input';
import { addBook, addFile } from '@/app/api/apiService';
import { useAuth } from '@/components/AuthContext';

export default function Page() {
  const { token } = useAuth();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const fileFormData = new FormData();

    // 파일이 있으면 업로드
    if (files[0]) {
      fileFormData.append('file', files[0]);

      try {
        const res = await addFile(fileFormData);
        formData.append('image', res.data);
      } catch (error) {
        console.error('파일 업로드 실패:', error);
        return;
      }
    }

    // addBook 실행
    try {
      const review = sessionStorage.getItem('SlateText');
      if (review) {
        formData.append('review', review);
      }
      await addBook(formData).then((res) => {
        if (res.data === 'success') {
          alert('책 등록 완료');
          sessionStorage.removeItem('SlateText');
          router.push('/bookcase/books');
        }
      });
    } catch (error) {
      console.error('책 등록 실패:', error);
    }
  };
  const handleClose = () => {
    sessionStorage.removeItem('SlateText');
    router.back();
  };

  return (
    <div className="w-full p-8 md:p-2">
      <div className=" border border-gray-300 mb-8 flex justify-between p-4 items-center rounded-xl text-black md:mb-2 sm:flex-col md:p-2 md:px-4">
        <div className="text-xl font-bold">책 등록하기</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="max-w-full mx-auto flex gap-8 md:flex-col md:items-center md:gap-2">
          <div className="w-[420px] h-[400px] border border-gray-300 rounded-xl bg-white flex flex-col items-center overflow-hidden md:h-full md:w-fit  ">
            <Dropzone onFilesChange={handleFileChange} />
          </div>
          <div className="w-full px-12 py-6 text-black border border-gray-300 rounded-xl lg:px-6 lg:py-2 md:overflow-x-auto ">
            <table className="table-fixed w-full h-full md:w-[600px]">
              <tbody>
                <tr className="text-xl font-bold border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    책 이름
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <input type="hidden" name="writer" value={token || ''} />
                    <Input name="title" placeholder="책이름을 입력해 주세요." />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">저자</td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input placeholder="저자를 입력해주세요." name="author" />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    출판사
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      placeholder="출판사를 입력해주세요."
                      name="publisher"
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
                      placeholder="카테고리를 입력해주세요."
                      name="category"
                    />
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">위치</td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input placeholder="위치를 입력해주세요." name="location" />
                  </td>
                </tr>
                <tr>
                  <td className="w-[200px] px-4 py-2 lg:px-2 lg:py-1">
                    한줄평
                  </td>
                  <td className="px-4 py-2 lg:px-2 lg:py-1">
                    <Input
                      placeholder="한줄평을 입력해주세요."
                      name="oneline"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full h-full mt-8 md:mt-2">
          <div className="w-full  bg-white border border-gray-300 rounded-xl p-6">
            <div className="w-full  text-black text-xl font-bold mb-4">
              상세 리뷰
            </div>
            <TextArea />
          </div>
        </div>
        <div className="w-full flex justify-end gap-4 md:gap-2 mt-4 text-black">
          <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-[#fb5234] hover:text-white transition-all duration-300">
            등록하기
          </button>
          <button
            onClick={handleClose}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-[#fb5234] hover:text-white transition-all duration-300">
            취소하기
          </button>
        </div>
      </form>
    </div>
  );
}
