"use client"

import React, { useContext, useEffect, useState } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';

interface CopilotResearchProps {
    
}

export const CopilotResearch: React.FC<CopilotResearchProps> = () => {

    const { 
        userSearchQuestion,
        userSearchAnswers,
        setUserSearchAnswers
     } = useContext(CopilotContext);

    useEffect(() => {
        const doResearch = async () => {
            const response = await fetch('/api/research', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userSearchQuestion })
            });

            const { research } = await response.json();
            const researchTyped = research as string | null;

            if (researchTyped)
            {
                setUserSearchAnswers([...userSearchAnswers, researchTyped]);
            }
        };

        if (userSearchQuestion) {
            doResearch();
        }

    }, [userSearchQuestion]);

    return (
        userSearchAnswers.map((userSearchAnswer, index) => {
            return (
                <div key={index} className={index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"}>
                    <div className="p-10">
                        <MessageMarkdown content={userSearchAnswer} />
                    </div>
                </div>
            );
        })
    );
};
