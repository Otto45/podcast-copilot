"use client"

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [loginErrorMessage, setloginErrorMessage] = useState<string | null>(null);

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value as string;
    const password = event.currentTarget.password.value as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      router.push('/');
    }

    setloginErrorMessage('Invalid email or password. Please try again.');
  };

  return (
    <div className="flex items-center h-full">
      <form onSubmit={signIn}>
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your email and password to login to your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="name@example.com" type="email" autoComplete="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" required />
            </div>

            <Button type="submit" className="w-full">Login</Button>
            {loginErrorMessage && <p className="text-red-500">{loginErrorMessage}</p>}

            <Button type="button" className="w-full" onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
          </div>
          <div className="space-y-2 text-center">
            <Link className="underline" href="#">
              Forgot your password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
