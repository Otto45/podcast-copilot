"use client"

import React, { useContext, useEffect, useRef } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';

const getSuggestionsInterval = 60000;

interface CopilotResearchProps {
    
}

export const CopilotResearch: React.FC<CopilotResearchProps> = () => {

    const { transcript } = useContext(CopilotContext);
    const researchRef = useRef<Array<string>>([]);
    const lastResearchTimestampRef = useRef<number | null>(null);

    useEffect(() => {
        const doResearch = async () => {
            const response = await fetch('/api/research', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transcript })
            });

            const { research } = await response.json();

            if (research.length > 0)
            {
                researchRef.current.push(research);
            }
        };

        if (transcript.length > 0 &&
            (lastResearchTimestampRef.current === null || Date.now() - lastResearchTimestampRef.current > getSuggestionsInterval)) {

                doResearch();
                lastResearchTimestampRef.current = Date.now();
        }
    }, [transcript]);

    return (
        researchRef.current.map((research, index) => {
            return (
                <MessageMarkdown key={index} content={research} />
            );
        })
    );
};
