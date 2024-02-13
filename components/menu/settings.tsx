"use client"

import React, { FC, useContext } from 'react';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
}
    from "@/components/ui/sheet";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { CopilotContext } from '@/context/context';

interface SettingsMenuProps {

}

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    const router = useRouter();
    const { sidebarIsOpen, setSidebarIsOpen } = useContext(CopilotContext);
    
    const logout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <Sheet modal={false} open={sidebarIsOpen} onOpenChange={setSidebarIsOpen} >
            <SheetContent className="flex flex-col justify-between bg-slate-900" side="left">
                <SheetHeader>
                    <SheetTitle>Podcast Copilot</SheetTitle>
                    <SheetDescription>
                        Edit copilot settings
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <Button type="button" onClick={logout}>Logout</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
