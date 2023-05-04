// /middleware.ts 
// This middleware is to set the url as a header, which will be used inside the layout and page file. 
import { NextResponse } from 'next/server';

export function middleware(request: Request) {


  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    }
  });
}