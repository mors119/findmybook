'use client';

import React, { useEffect, useState } from 'react';
import { Books } from '@/components/main/books';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { getMainBooks } from '@/app/api/apiService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Book } from '@/types/definition';

export function MainSwiper({ title }: { title: string }) {
  const [isSwiper, setIsSwiper] = useState(4); // Default slides count
  const [swiperClass, setSwiperClass] = useState('max-w-[1500px]'); // Default class
  const [bookData, setBookData] = useState<Book[]>([]); // 초기값 빈 배열

  // API 호출: 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    (async () => {
      try {
        const res = await getMainBooks(10);
        setBookData(res.data.content || []);
      } catch (error) {
        console.error('Failed to fetch book data:', error);
        setBookData([]); // 에러 시 빈 배열 설정
      }
    })();
  }, []);

  // 리사이즈 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1920 && window.innerWidth > 1190) {
        setIsSwiper(3);
        setSwiperClass('max-w-[1200px]');
      } else if (window.innerWidth < 1190 && window.innerWidth > 600) {
        setIsSwiper(2);
        setSwiperClass('max-w-[800px]');
      } else if (window.innerWidth < 600) {
        setIsSwiper(1);
        setSwiperClass('max-w-[380px]');
      } else {
        setIsSwiper(4);
        setSwiperClass('max-w-[1500px]');
      }
    };

    // 초기 실행 및 이벤트 등록
    handleResize();
    window.addEventListener('resize', handleResize);

    // 이벤트 해제
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex p-8 gap-8 max-w-[1500px] flex-col">
      <h2 className="text-3xl text-black font-bold">{title}</h2>
      <Swiper
        loop={true} // 슬라이드 루프
        spaceBetween={20} // 슬라이드 간격
        slidesPerView={isSwiper} // 보여질 슬라이드 수
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용 시 슬라이더 정지 비활성화
        }}
        className={swiperClass}>
        {bookData.map((book, idx) => (
          <SwiperSlide key={idx}>
            <Books
              no={book?.no || 0}
              title={book?.title || ''}
              author={book?.author || ''}
              date={book?.rigDate || ''}
              image={book?.image || ''}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
