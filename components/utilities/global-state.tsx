"use client"

import { CopilotContext } from '@/context/context';
import React from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
    const [isRecording, setIsRecording] = React.useState<boolean>(false)

    return (
        <CopilotContext.Provider
            value={{
                isRecording,
                setIsRecording
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
