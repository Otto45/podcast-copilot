import { CopilotResearch } from '@/components/copilot/copilot-research';
import { CopilotSuggestions } from '@/components/copilot/copilot-suggestions';
import React from 'react';

interface CopilotProps {
    
}

export default function Copilot() {

    return (
        <main className="flex min-h-screen flex-row items-center justify-evenly p-24">
            <div>
                <CopilotSuggestions />
            </div>
            <div>
                <CopilotResearch />
            </div>
        </main>
    );
};
