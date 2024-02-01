"use client"

import React from 'react';
import { createClient } from '@/utils/supabase/client';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';

// TODO: Create custom theme to match the rest of the app
// https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#create-theme
export default function LoginPage() {
  const supabase = createClient();

  // TODO: For email auth, we need to redirect to home after logging in

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      socialLayout="horizontal"
      theme="dark"
      providers={[]}
    />
  );
};
