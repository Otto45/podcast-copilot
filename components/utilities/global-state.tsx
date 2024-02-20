"use client"

import { CopilotContext } from '@/context/context';
import React, { FC, useState } from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [userSearchQuestion, setUserSearchQuestion] = useState<string | null>(null);

    return (
        <CopilotContext.Provider
            value={{
                isRecording,
                setIsRecording,
                
                transcript,
                setTranscript,

                userSearchQuestion,
                setUserSearchQuestion
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
