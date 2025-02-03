// 서버 컴포넌트
import { getAllBookNos } from '@/app/api/apiService';
import BookDetail from './BookDetail';

export async function generateStaticParams() {
  try {
    const books = await getAllBookNos();
    return books.data.map((no: number) => ({
      no: no.toString(),
    }));
  } catch (error) {
    console.error('Failed to fetch book data:', error);
    return []; // 빈 배열 반환
  }
}

export default function Page() {
  return <BookDetail />;
}
