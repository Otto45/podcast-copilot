"use client"

import dynamic from "next/dynamic"

// We have to use dynamic imports here because the copilot-ui component uses the recordRTC library, which is not compatible with SSR.
const CopilotUi = dynamic(() => import('@/components/copilot/copilot-ui').then(module => module.CopilotUi), { ssr: false });

export default function Copilot() {

    return (
        <main>
            <CopilotUi />
        </main>
    );
};
