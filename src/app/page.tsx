import { MainSwiper } from '@/components/main/swiperMain';
import { Menu } from '@/components/main/menu';
export default async function Home() {
  return (
    <div className="flex gap-6 h-fit mt-6 md:flex-col md:gap-2 md:mt-2 md:h-full ">
      <div className="border border-gray-300 w-80 h-[500px] bg-white rounded-2xl py-12 lg:hidden">
        <Menu />
        <h1 className="text-2xl font-bold"></h1>
      </div>
      <div className="border border-gray-300 w-full bg-white rounded-2xl overflow-y-auto">
        <MainSwiper title="최신 등록" />
      </div>
    </div>
  );
}
