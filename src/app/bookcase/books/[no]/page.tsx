// 서버 컴포넌트
import { getAllBookNos } from '@/app/api/apiService';
import BookDetail from './BookDetail';

export async function generateStaticParams() {
  const books = await getAllBookNos();
  return books.data.map((no: number) => ({
    no: no.toString(),
  }));
}

export default function Page() {
  return <BookDetail />;
}
