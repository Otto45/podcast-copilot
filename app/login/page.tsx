import React from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';

// TODO: Create custom theme to match the rest of the app
// https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#create-theme
export default function LoginPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    return (
        <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    );
};
