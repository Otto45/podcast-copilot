"use client"

import { CopilotContext } from '@/context/context';
import React, { FC, useState } from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

    return (
        <CopilotContext.Provider
            value={{
                isRecording,
                setIsRecording,
                
                transcript,
                setTranscript,

                sidebarIsOpen,
                setSidebarIsOpen
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
