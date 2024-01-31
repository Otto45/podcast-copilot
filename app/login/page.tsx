import React, { FC } from 'react';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

// TODO: Create custom theme to match the rest of the app
// https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#create-theme
export const LoginPage: FC = () => {
    return (
        <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    );
};
