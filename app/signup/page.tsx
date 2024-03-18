"use client"

import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    
    const [signUpErrorMessage, setSignUpErrorMessage] = React.useState<string | null>(null);

    const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = event.currentTarget.email.value as string;
        const password = event.currentTarget.password.value as string;
        const confirmPassword = event.currentTarget.confirmPassword.value as string;
        const supabase = createClient();

        if (password !== confirmPassword) {
            setSignUpErrorMessage('Passwords do not match');
            return;
        }

        const url = process.env.NEXT_PUBLIC_VERCEL_URL ?? 'localhost:3000';

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `https://${url}`
            }
        });

        if (error) {
            setSignUpErrorMessage(error.message);
            return;
        }

        router.push('/');
    };

    return (
        <div className="flex items-center h-full">
            <form onSubmit={signUp}>
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-gray-500 dark:text-gray-400">Enter your email and password to sign up</p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="name@example.com" type="email" autoComplete="email" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" autoComplete="new-password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" autoComplete="new-password" required />
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                        {signUpErrorMessage && <p className="text-red-500">{signUpErrorMessage}</p>}
                    </div>
                </div>
            </form>
        </div>
    );
}
