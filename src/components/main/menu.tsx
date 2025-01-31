'use client';
import { menuItems } from '@/lib/data';
import Link from 'next/link';
import { MainButton } from '@/components/buttons';
import { usePathname } from 'next/navigation';

export function Menu() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 items-center">
      {menuItems.map((item, idx) => {
        return (
          <span
            className="text-black text-2xl my-4 hover:underline hover:text-[#fb5234]"
            key={item.link + idx}>
            <Link href={`/${item.link}`}>{item.title}</Link>
          </span>
        );
      })}
      {pathname !== '/' && <MainButton />}
    </div>
  );
}
