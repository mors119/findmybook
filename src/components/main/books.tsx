'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
// import { motion } from 'framer-motion';

interface BookProps {
  no: number;
  title: string;
  author: string;
  date: string;
  image: string;
  css?: string;
}
export function Books({ no, title, author, date, image, css }: BookProps) {
  const [itemImage, setItemImage] = useState<string | undefined>(undefined);
  const [itemTitle, setItemTitle] = useState(title);

  useEffect(() => {
    if (image) {
      setItemImage(`/upload/${image}`);
      setItemTitle(title);
    } else {
      setItemTitle('no image, 이미지를 준비중 입니다.');
      setItemImage('/noImage.jpeg');
    }
  }, [image, title]);
  return (
    <div className="w-80 h-[400px] border border-gray-300 rounded-xl bg-white flex flex-col items-center p-6 overflow-hidden hover:border-4 hover:border-[#fb5234] ">
      <Link className={`text-center ${css}`} href={`/bookcase/books/${no}`}>
        <div className=" w-64 h-64  rounded-xl hover:h-80 hover:w-80 overflow-hidden mx-auto ">
          <Image
            src={itemImage || '/noImage.jpeg'}
            alt={itemTitle}
            width={320}
            height={320}
            className="bg-center w-full h-full block object-cover rounded-xl"
          />
        </div>
        <div className="text-xl mt-4 font-bold text-black text-ellipsis overflow-hidden">
          {title}
        </div>
        <div className="text-lg text-gray-500 text-ellipsis overflow-hidden">
          {author}
        </div>
        <div className="text-xs mt-2 text-gray-400 text-ellipsis overflow-hidden">
          {date}
        </div>
      </Link>
    </div>
  );
}
