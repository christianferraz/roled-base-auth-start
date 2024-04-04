import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'

export const auth: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' },
        domain: {
          label: 'Domain',
          type: 'text',
          placeholder: 'domain',
          value: 'ADMINNET'
        }
      },
      async authorize(credentials) {
        const user: User = {
          id: '1',
          name: credentials?.username,
          email: credentials?.username + '@' + credentials?.domain,
          domain: credentials?.domain,
          role: 'default'
        }
        if (user) {
          return user
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      let domain: string
      if (user) {
        domain = user.domain || 'default'
        if (domain === 'ADMINNET') {
          token.role = 'admin'
          token.domain = domain
        } else {
          token.role = 'default'
          token.domain = domain
        }
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      session.user.domain = token.domain
      return session
    }
  }
}
