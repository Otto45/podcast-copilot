"use client"

import { createClient } from "@/utils/supabase/client";
import router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LoginLayoutProps {
    children: React.ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    // https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        const getSession = async () => {
            const supabase = createClient();
            const session = (await supabase.auth.getSession()).data.session;

            if (session) {
                router.push('/');
            }

            setIsClient(true);
        };

        getSession();
    }, []);

    return (
        isClient &&
        <div className="h-full w-1/3">
            {children}
        </div>
    );
}
