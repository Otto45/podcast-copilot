"use client"

import dynamic from "next/dynamic"
import { SettingsMenu } from "@/components/menu/settings";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { CopilotContext } from "@/context/context";
import { ChevronRight } from "@/components/ui/icons";
import { cn } from "@/utils/utils";


// We have to use dynamic imports here because the copilot-ui component uses the recordRTC library, which is not compatible with SSR.
const CopilotUi = dynamic(() => import('@/components/copilot/copilot-ui').then(module => module.CopilotUi), { ssr: false });

export default function Copilot() {
    const { sidebarIsOpen, setSidebarIsOpen } = useContext(CopilotContext);

    const toggleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen);
    };

    const sidebarToggleButtonCss = cn(
        "absolute h-10 w-10 top-[50%] translate-y-[-50%] transition-all",
        sidebarIsOpen ? "left-[380px] duration-500 rotate-180" : "left-[5px] duration-300 rotate-0");

    return (
        <>
            <button className={sidebarToggleButtonCss} onClick={toggleSidebar}>
                <ChevronRight theme="dark"></ChevronRight>
            </button>
            <main className="flex flex-col h-full w-full">
                <SettingsMenu />
                <CopilotUi />
            </main>
        </>
    );
};
