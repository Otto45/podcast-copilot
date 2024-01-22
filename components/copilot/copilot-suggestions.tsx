"use client"

import React, { useContext } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';

interface CopilotSuggestionsProps {
    
}

export const CopilotSuggestions: React.FC<CopilotSuggestionsProps> = () => {

    const { transcript } = useContext(CopilotContext);

    return (
        <div>
            <MessageMarkdown content={transcript} />
        </div>
    );
};
