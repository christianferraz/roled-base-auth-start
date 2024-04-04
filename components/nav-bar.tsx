import { auth as authOptions } from '@/lib/auth-config'
import { LogIn, LogOut, ShieldCheck } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { Button } from './ui/button'

const linkItems = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'Auth (Client)',
    path: '/auth-client'
  },
  {
    label: 'Auth (Server)',
    path: '/auth-server'
  },
  {
    label: 'Admin Only',
    path: '/admin-only'
  }
] as const

type LinkType = (typeof linkItems)[number]

const NavBar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <header>
      <nav className="shadow-b--md container my-2 flex items-center justify-around border-b-[0.5px]  py-2 shadow-green-100/20">
        <Button variant={'ghost'} size={'icon'}>
          <ShieldCheck
            color={session ? 'green' : 'red'}
            className="h-24 w-24"
          />
        </Button>
        <div className="flex space-x-2">
          {linkItems.map(({ label, path }: LinkType) => (
            <Link
              className="rounded-sm  bg-green-800/40 p-2"
              key={label}
              href={path}
            >
              {label}
            </Link>
          ))}
        </div>
        <Button variant={'ghost'} size={'icon'}>
          {session ? (
            <Link href={'/api/auth/signout?callbackUrl=/'}>
              <LogOut color="red" className="h-10 w-10" />
            </Link>
          ) : (
            <Link href={'/api/auth/signin?callbackUrl=/'}>
              <LogIn color="green" className="h-10 w-10" />
            </Link>
          )}
        </Button>
      </nav>
    </header>
  )
}

export default NavBar
