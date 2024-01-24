"use client"

import { CopilotContext } from '@/context/context';
import React, { FC, useState } from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');

    return (
        <CopilotContext.Provider
            value={{
                isRecording,
                setIsRecording,
                
                transcript,
                setTranscript
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
