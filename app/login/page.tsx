import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LoginProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Login({ searchParams }: LoginProps) {
  const signIn = async (formData: FormData) => {
    'use server'

    const supabase = createClient()

    const credentials: SignInWithPasswordCredentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    const { error } = await supabase.auth.signInWithPassword(credentials)
  
    if (error) {
      redirect('/login?loginFailed=true')
    }
  
    revalidatePath('/', 'layout')
    redirect('/')
  };

  return (
    <div className="flex items-center h-full">
      <form>
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your email and password to login to your account</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="name@example.com" type="email" autoComplete="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>

            <Button formAction={signIn} className="w-full">Login</Button>
            {searchParams.loginFailed && <p className="text-red-500">Login failed. Username or password is incorrect.</p>}
          </div>
          <div className="space-y-2 text-center">
            <Link className="underline" href="/signup">Sign Up</Link>
          </div>
          <div className="space-y-2 text-center">
            <Link className="underline" href="#">Forgot your password?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
