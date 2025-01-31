import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';
import { deleteBook, deleteFile } from '@/app/api/apiService';
import { useRouter } from 'next/navigation';
// 로고 (버튼)
export function LogoHomeBtn() {
  return (
    <div className="border border-gray-300 w-80 h-24 bg-white rounded-2xl hover:border-4 hover:border-[#fb5234] md:w-full md:flex md:justify-center md:h-auto md:border-4 md:border-black">
      <Link
        href="/"
        className="cursor-pointer h-full md:w-full justify-center flex">
        <Image
          src={logo}
          alt="logo"
          className="w-full h-full block md:w-40 md:h-auto"
        />
      </Link>
    </div>
  );
}

interface ButtonProps {
  bookNo: number;
  setKey?: React.Dispatch<React.SetStateAction<number>>;
  location?: string;
}

// 상세보기 수정
export const EditButton = ({ bookNo }: ButtonProps) => {
  return (
    <Link
      href={`/bookcase/books/${bookNo}/edit`}
      className="bg-white text-black border border-gray-300 text-xl font-bold rounded-xl px-4 py-2 mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] hover:text-white transition-all duration-300 md:mt-2 md:px-2 md:py-1 md:text-base">
      수정
    </Link>
  );
};
// 상세보기 삭제
export const DeleteButton = ({ bookNo, setKey, location }: ButtonProps) => {
  const router = useRouter();
  const handleDelete = () => {
    if (confirm('등록된 책을 삭제하시겠습니까?')) {
      deleteBook(bookNo)
        .then((res) => {
          if (
            res.data !== 'no' &&
            res.data !== null &&
            res.data !== undefined
          ) {
            deleteFile(res.data);
          }
          alert('삭제되었습니다.');
          if (setKey) {
            setKey((prevKey: number) => prevKey + 1);
          }
          if (location) {
            router.push(location);
          }
        })
        .catch(() => {
          alert('삭제 실패');
        });
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-white text-black border border-gray-300 text-xl font-bold rounded-xl px-4 py-2 mt-4 hover:bg-[#fb5234] hover:border-[#fb5234] hover:text-white transition-all duration-300 md:mt-2 md:px-2 md:py-1 md:text-base">
      삭제
    </button>
  );
};

// 메인으로 돌아가기
export const MainButton = () => {
  return (
    <Link
      href="/"
      className="bg-black text-white p-2 rounded-md  hover:bg-[#fb5234] hover:border-[#fb5234] transition-all duration-300 text-center">
      메인으로 돌아가기
    </Link>
  );
};
