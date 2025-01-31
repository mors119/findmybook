'use client';
import Image from 'next/image';
import search from '../../../public/search.png';
import sublogo from '../../../public/sublogo.png';
import close from '../../../public/close.png';
import login from '../../../public/login.png';
import logoutIcon from '../../../public/logout.png';
import menu from '../../../public/menu.png';
import { LogoHomeBtn } from '../buttons';
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Menu } from './menu';
import clsx from 'clsx';
import Login from './login';
import { useAuth } from '@/components/AuthContext';
import { getSearchBooks } from '@/app/api/apiService';
import { Book } from '@/types/definition';
import Link from 'next/link';
// import { div } from 'framer-motion/client';

export default function TopBar() {
  const { isLoggedIn, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchBooks, setSearchBooks] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  // 경로 변경 시 토글 끄기
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLoginOpen(false);
  }, [pathname]);

  // 하나가 열리면 하나는 끄기
  const handleClose = useCallback(() => {
    if (isMenuOpen) setIsMenuOpen(false);
    if (isLoginOpen) setIsLoginOpen(false);
    if (isSearchOpen) setIsSearchOpen(false);
  }, [isMenuOpen, isLoginOpen, isSearchOpen]);

  // 외부 클릭 시 토글 끄기
  const toggleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isLoginOpen, handleClose]);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearchOpen(true);
    if (searchBooks.length > 0) {
      getSearchBooks(searchBooks).then((res) => {
        if (res.data.length > 4) {
          setSearchResults(res.data.slice(0, 5));
        } else {
          setSearchResults(res.data);
        }
      });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex gap-6 md:flex-col md:gap-2">
      <LogoHomeBtn />
      <div className="flex gap-1 border border-gray-300 w-full bg-white h-24 rounded-2xl p-5 md:p-2 md:h-auto">
        <div className="h-14 w-14 p-1 md:hidden">
          <Image
            src={search}
            alt="search_image"
            width={56}
            height={56}
            className="h-full w-full "
          />
        </div>
        <div className="flex w-full h-14 rounded-xl overflow-hidden border-2 border-white focus-within:border-[#fb5234] relative">
          <form onSubmit={handleSubmit} className="flex w-full h-full">
            <input
              type="text"
              value={searchBooks}
              onChange={(e) => setSearchBooks(e.target.value)}
              placeholder="검색어를 입력해주세요"
              className=" bg-gray-200 w-full h-full text-2xl text-black focus-visible:outline-none px-5 placeholder:text-lg"
            />
            <button className="bg-black w-14 h-full ">
              <Image
                src={sublogo}
                alt="search_button"
                className="w-full h-full"
              />
            </button>
          </form>
        </div>
        {!isLoggedIn ? (
          <button
            className="w-14 h-14 rounded-xl p-1 bg-black hover:bg-[#f05b30] hover:border-none ml-2 transition-all duration-300 md:ml-0"
            onClick={() => setIsLoginOpen(!isLoginOpen)}>
            <Image src={login} alt="login" className="w-full h-full" />
          </button>
        ) : (
          <button
            className="w-14 h-14 rounded-xl p-1 bg-black hover:bg-[#f05b30] hover:border-none ml-2 transition-all duration-300 md:ml-0"
            onClick={handleLogout}>
            <Image src={logoutIcon} alt="logout" className="w-full h-full" />
          </button>
        )}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={clsx(
            'w-14 h-14 rounded-xl p-1 bg-black hover:bg-[#f05b30] hover:border-none ml-2 transition-all duration-300 md:ml-0 ',
            pathname === '/' && 'hidden lg:block',
          )}>
          <Image
            src={menu}
            alt="login"
            className={clsx(
              'w-full h-full text-white mx-auto',
              isMenuOpen && 'w-8 h-8',
            )}
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            className="border-4 border-[#fb5234] rounded-2xl w-[360px] absolute top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] p-4 z-50"
            ref={toggleRef}>
            <div className="text-3xl text-center mb-4 font-bold text-[#fb5234]">
              Menu
            </div>
            <button
              className="border border-1 w-8 h-8 rounded-md absolute top-2 right-2 bg-black hover:bg-[#f05b30] hover:border-none ml-2 transition-all duration-300"
              onClick={handleClose}>
              <Image src={close} alt="close" className="w-full h-full" />
            </button>

            {/* Menu는 항상 출력 */}
            <Menu />
          </div>
        </div>
      )}

      {/* Login은 isLoginOpen일 때만 출력 */}
      {isLoginOpen && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            className="border-4 border-[#fb5234] rounded-2xl w-[360px] absolute top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] p-4 z-50"
            ref={toggleRef}>
            <div className="text-3xl text-center mb-4 font-bold text-[#fb5234]">
              Login
            </div>
            <button
              className="border border-1 w-8 h-8 rounded-md absolute top-2 right-2 bg-black hover:bg-[#f05b30] hover:border-none ml-2 transition-all duration-300"
              onClick={handleClose}>
              <Image src={close} alt="close" className="w-full h-full" />
            </button>
            <Login />
          </div>
        </div>
      )}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            className="border-4 border-[#fb5234] rounded-2xl w-[360px] absolute top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] p-4 z-50"
            ref={toggleRef}>
            <div className="text-3xl text-center mb-4 font-bold text-[#fb5234]">
              Search
            </div>
            <button
              className="border border-1 w-8 h-8 rounded-md absolute top-2 right-2 bg-black hover:bg-[#f05b30] hover:border-none ml-2 transition-all duration-300"
              onClick={handleClose}>
              <Image src={close} alt="close" className="w-full h-full" />
            </button>
            {searchResults.length > 0 ? (
              <div className="text-2xl text-center mb-6 font-bold text-black">
                {searchResults.map((book, idx) => (
                  <div
                    key={idx}
                    className="text-center border border-gray-300 p-4 mb-2 hover:bg-black hover:text-white transition-all duration-300 rounded-xl">
                    <Link
                      onClick={() => setIsSearchOpen(false)}
                      href={`/bookcase/books/${book.no}`}>
                      {book.title}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-2xl text-center mb-4 font-bold text-black">
                <h2 className="text-center my-8">검색 결과가 없습니다.</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
