"use client"

import React, { FC, useContext, useEffect, useRef } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';
import { CopilotSuggestedQuestions } from '@/types/types';

const generateQuestionSuggestionsInterval = 30000; // ms

export const CopilotSuggestions: FC = () => {

    const { transcript, setTranscript } = useContext(CopilotContext);
    const suggestionsRef = useRef<Array<string>>([]);
    const lastSuggestionTimestampRef = useRef<number>(Date.now());

    useEffect(() => {
        const getSuggestions = async () => {
            const response = await fetch('/api/suggestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ transcript })
            });

            const copilotSuggestedQuestions: CopilotSuggestedQuestions = await response.json();

            if (copilotSuggestedQuestions.questions.length > 0) {
                suggestionsRef.current.push(...copilotSuggestedQuestions.questions);
            }
        };

        if (transcript.length > 0 &&
            (Date.now() - lastSuggestionTimestampRef.current > generateQuestionSuggestionsInterval)) {

            getSuggestions();
            lastSuggestionTimestampRef.current = Date.now();
            setTranscript('');
        }
    }, [transcript]);

    return (
        suggestionsRef.current.map((suggestion, index) => {
            return (
                <div key={index} className={index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"}>
                    <div className="p-10">
                        <MessageMarkdown content={suggestion} />
                    </div>
                </div>
            );
        })
    );
};
