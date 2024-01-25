"use client"

import React, { FC, useContext, useEffect, useRef } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';

const getSuggestionsInterval = 60000;

interface CopilotSuggestionsProps {

}

export const CopilotSuggestions: FC<CopilotSuggestionsProps> = () => {

    const { transcript } = useContext(CopilotContext);
    const suggestionsRef = useRef<Array<string>>([]);
    const lastSuggestionTimestampRef = useRef<number | null>(null);

    useEffect(() => {
        const getSuggestions = async () => {
            const response = await fetch('/api/suggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transcript })
            });

            const { suggestions } = await response.json();
            suggestionsRef.current.push(suggestions);
        };

        if (transcript.length > 0 &&
            (lastSuggestionTimestampRef.current === null || Date.now() - lastSuggestionTimestampRef.current > getSuggestionsInterval)) {

            getSuggestions();
            lastSuggestionTimestampRef.current = Date.now();
        }
    }, [transcript]);

    return (
        suggestionsRef.current.map((suggestion, index) => {
            return (
                <MessageMarkdown key={index} content={suggestion} />
            );
        })
    );
};
