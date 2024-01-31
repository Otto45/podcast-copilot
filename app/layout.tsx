"use client"

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/utilities/providers';
import { GlobalState } from '@/components/utilities/global-state';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createClient();
        const session = (await supabase.auth.getSession()).data.session;
        console.log(session);

        if (!session) {
          router.push('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkSession();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="dark">
          <div className="bg-background text-foreground">
            <GlobalState>
              {children}
            </GlobalState>
          </div>
        </Providers>
      </body>
    </html>
  )
}
