"use client"

import React, { useContext } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';

interface CopilotResearchProps {
    
}

export const CopilotResearch: React.FC<CopilotResearchProps> = () => {

    const { transcript } = useContext(CopilotContext);

    return (
        <MessageMarkdown content={transcript} />
    );
};
