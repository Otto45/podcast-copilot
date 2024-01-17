"use client"

import { CopilotContext } from '@/context/context';
import React from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
    return (
        <CopilotContext.Provider
            value={{

            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}