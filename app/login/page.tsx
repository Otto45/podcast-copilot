"use client"

import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';

// TODO: Just convert this to use its own form and code,
// the redirectTo feature isn't working locally

// TODO: Create custom theme to match the rest of the app
// https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#create-theme
export default function LoginPage() {
  const supabase = createClient();

  const redirectTo = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      socialLayout="horizontal"
      theme="dark"
      providers={[]}
      redirectTo={redirectTo}
    />
  );
};
