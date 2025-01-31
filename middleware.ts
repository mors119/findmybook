// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
//  // 클라이언트 사이드로 이동하면 미들웨어가 동작하지 않음

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();

//   // 예: 로그인 여부를 확인
//   const token = req.cookies.get('token');

//   // 로그인되지 않은 사용자를 로그인 페이지로 리다이렉트
//   if (!token && url.pathname !== '/') {
//     url.pathname = '/';
//     return NextResponse.redirect(url);
//   }

//   // 요청을 그대로 통과시키는 경우
//   return NextResponse.next();
// }

// // 적용할 경로를 설정
// export const config = {
//   matcher: ['/bookcase/:path*'], // 미들웨어가 작동할 경로
// };

// //클라이언트 사이드 미들웨어 적용 예시

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// export default function ProtectedPage() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       router.push('/login'); // 로그인 페이지로 리디렉션
//     }
//   }, [router]);

//   return <div>Protected Content</div>;
// }
