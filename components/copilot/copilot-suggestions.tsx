"use client"

import React, { FC, useContext } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';

interface CopilotSuggestionsProps {
    
}

export const CopilotSuggestions: FC<CopilotSuggestionsProps> = () => {

    const { transcript } = useContext(CopilotContext);

    return (
        <MessageMarkdown content={transcript} />
    );
};
