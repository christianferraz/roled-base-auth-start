import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === '/admin-only' &&
      req.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/unauthorized', req.url))
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        console.log(`authorized ${token?.role}`)
        return !!token
      }
    }
  }
)
// vai exportar apenas o admin na rota
export const config = { matcher: ['/admin-only'] }
