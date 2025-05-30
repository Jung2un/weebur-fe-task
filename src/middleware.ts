import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'view_mode';
const EXPIRY_TIME = 86400; // 24시간

type ViewMode = 'list' | 'grid';

// 쿠키에 저장할 문자열 포맷 생성
function createCookieValue(viewMode: ViewMode, expirationTime: Date): string {
  return `${viewMode}:${expirationTime.getTime()}`;
}

// 쿠키 값 유효 검사 (형식 및 시간)
function isCookieValid(cookieValue: string): boolean {
  const [mode, expStr] = cookieValue.split(':');
  const expirationTime = parseInt(expStr, 10);
  return !!mode && Date.now() <= expirationTime && !isNaN(expirationTime);
}

// 쿠키 값 세팅
function setCookie(response: NextResponse, viewMode: ViewMode, expirationTime: Date) {
  const cookieValue = createCookieValue(viewMode, expirationTime);

  response.cookies.set(COOKIE_NAME, cookieValue, {
    expires: expirationTime,
    httpOnly: false,
    path: '/',
  });

  response.headers.set('x-view-mode', viewMode);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== '/products') return NextResponse.next();

  const response = NextResponse.next();
  const viewCookie = request.cookies.get(COOKIE_NAME);

  // 쿠키가 없거나 만료된 경우
  if (!viewCookie || !isCookieValid(viewCookie.value)) {
    const mode = Math.random() < 0.5 ? 'list' : 'grid';
    const expiry = new Date(Date.now() + EXPIRY_TIME * 1000);
    setCookie(response, mode, expiry);

    return response;
  }

  // 쿠키가 있고 유효한 경우
  const currentMode = viewCookie.value.split(':')[0] as ViewMode;
  response.headers.set('x-view-mode', currentMode);
  return response;
}

export const config = {
  matcher: '/products',
};