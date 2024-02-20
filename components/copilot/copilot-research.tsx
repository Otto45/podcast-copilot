"use client"

import React, { useContext, useEffect, useState } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';
import { CopilotChatItem } from '@/types/types';

interface CopilotResearchProps {

}

export const CopilotResearch: React.FC<CopilotResearchProps> = () => {
    const {
        currentUserQuestion,
        copilotChatItems,
        setCopilotChatItems
    } = useContext(CopilotContext);

    useEffect(() => {
        const doResearch = async () => {
            const response = await fetch('/api/research', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ currentUserQuestion })
            });

            const { research } = await response.json();
            const researchTyped = research as string | null;

            if (researchTyped) {
                const userQuestion: CopilotChatItem = { 'role': 'user', 'content': currentUserQuestion! };
                const copilotAnswer: CopilotChatItem = { 'role': 'copilot', 'content': researchTyped };
                setCopilotChatItems([...copilotChatItems, userQuestion, copilotAnswer]);
            }
        };

        if (currentUserQuestion) {
            doResearch();
        }

    }, [currentUserQuestion]);

    return (
        copilotChatItems.map((copilotChatItem, index) => {
            return (
                <div key={index} className={index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"}>
                    {
                        copilotChatItem.role === 'user' ?
                            <div className="p-10">
                                <MessageMarkdown content={copilotChatItem.content} copilotChatRole={copilotChatItem.role} />
                            </div>
                            :
                            <div className="p-10">
                                <MessageMarkdown content={copilotChatItem.content} copilotChatRole={copilotChatItem.role} />
                            </div>
                    }
                </div>
            );
        })
    );
};
