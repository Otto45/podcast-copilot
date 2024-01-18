"use client"

import React, { useContext } from 'react';
import { CopilotResearch } from '@/components/copilot/copilot-research';
import { CopilotSuggestions } from '@/components/copilot/copilot-suggestions';
import { CopilotContext } from '@/context/context';

export default function Copilot() {

    const { isRecording, setIsRecording } = useContext(CopilotContext)

    return (
        <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
            {isRecording ? (
                <>
                    <div className="flex min-w-full flex-row items-center justify-evenly">
                        <div>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => setIsRecording(false)}
                            >
                                Stop Recording
                            </button>
                        </div>
                    </div>
                    <div className="flex min-w-full flex-row items-center justify-evenly">
                        <div>
                            <CopilotSuggestions />
                        </div>
                        <div>
                            <CopilotResearch />
                        </div>
                    </div>
                </>

            ) : (
                <div className="flex flex-col items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setIsRecording(true)}
                    >
                        Start Recording
                    </button>
                </div>
            )}
        </main>
    );
};
