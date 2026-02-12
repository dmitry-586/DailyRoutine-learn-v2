import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import { MainLayout, QueryProvider } from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Project Template',
  description: 'Next.js project template',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${inter.variable} custom-scrollbar antialiased`}>
        <QueryProvider>
          <MainLayout>
            <ToastContainer
              position='top-center'
              autoClose={3000}
              pauseOnHover
              theme='dark'
            />
            {children}
          </MainLayout>
        </QueryProvider>
      </body>
    </html>
  )
}
