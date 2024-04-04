import NavBar from '@/components/nav-bar'
import AuthProvider from '@/components/providers/auth-provider'
import './globals.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="dark">
        <AuthProvider>
          <NavBar />
          <main className="grid h-screen w-screen place-content-center">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
