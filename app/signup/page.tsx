import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';

interface SignUpProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Signup({ searchParams }: SignUpProps) {
    const signUp = async (formData: FormData) => {
        'use server'

        if (!formData.get('email')) {
            redirect('/signup?signUpError=Email is required');
        }

        if (!formData.get('password')) {
            redirect('/signup?signUpError=Password is required');
        }

        if (!formData.get('confirmPassword')) {
            redirect('/signup?signUpError=Confirm Password is required');
        }

        if (formData.get('password') !== formData.get('confirmPassword')) {
            redirect('/signup?signUpError=Passwords do not match');
        }

        const supabase = createClient()

        const credentials: SignUpWithPasswordCredentials = {
          email: formData.get('email') as string,
          password: formData.get('password') as string
        }

        const { error } = await supabase.auth.signUp(credentials)
      
        if (error) {
          redirect(`/signup?signUpError=${error.message}`)
        }
      
        revalidatePath('/', 'layout')
        redirect('/')
    };

    return (
        <div className="flex items-center h-full">
            <form>
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your email and password to sign up</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="name@example.com" type="email" autoComplete="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" autoComplete="new-password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
                        </div>
                        <Button formAction={signUp} className="w-full">Sign Up</Button>
                        {searchParams.signUpError && <p className="text-red-500">{searchParams.signUpError}</p>}
                    </div>
                </div>
            </form>
        </div>
    );
}
