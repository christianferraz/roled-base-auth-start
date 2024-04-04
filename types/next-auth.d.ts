import 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string | undefined
      domain?: string | undefined
    }
  }
  interface User {
    role: string | undefined
    domain?: string | undefined
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string | undefined
    domain?: string | undefined
  }
}
