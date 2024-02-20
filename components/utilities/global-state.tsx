"use client"

import { CopilotContext } from '@/context/context';
import { CopilotChatItem } from '@/types/types';
import React, { FC, useState } from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');
    const [currentUserQuestion, setCurrentUserQuestion] = useState<string | null>(null);
    const [copilotChatItems, setCopilotChatItems] = useState<Array<CopilotChatItem>>(new Array<CopilotChatItem>());

    return (
        <CopilotContext.Provider
            value={{
                isRecording,
                setIsRecording,
                
                transcript,
                setTranscript,

                currentUserQuestion,
                setCurrentUserQuestion,

                copilotChatItems,
                setCopilotChatItems
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
