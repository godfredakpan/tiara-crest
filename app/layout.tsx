import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import Footer from './footer';
import { Suspense } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata = {
  title: 'Tira Crest',
  description:
    'The Ultimate Luxury'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <UserProvider>
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Footer />
      </body>
      </UserProvider>
    </html>
  );
}