import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'${inter.className} bg-stone-900 text-slate-100 font-normal container mx-auto p-4 flex flex-col min-h-screen'}>
        <main className='flex flex-col flex-grow justify-center'>
          {children}
        </main>
        <footer className={'mt-8 text-xs text-center font-normal'}>
          This quiz was made for the Senior Seminar: Anatomy of Crime.
        </footer>
      </body>
    </html>
  )
}
