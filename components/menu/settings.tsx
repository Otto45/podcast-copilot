"use client"

import React, { FC, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
}
    from "@/components/ui/sheet";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/utils';
import { ChevronRight } from '../ui/icons';

interface SettingsMenuProps {

}

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    const router = useRouter();
    const [ sidebarIsOpen, setSidebarIsOpen ] = useState<boolean>(false);

    const logout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    const toggleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    };

    const sidebarToggleButtonCss = cn(
        "absolute h-10 w-10 top-[50%] translate-y-[-50%] transition-all",
        sidebarIsOpen
            ? "left-[380px] duration-500 rotate-180"
            : "left-[5px] duration-300 rotate-0");

    return (
        <>
            <button className={sidebarToggleButtonCss} onClick={toggleSidebar}>
                <ChevronRight theme="dark"></ChevronRight>
            </button>
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
        </>
    );
};
