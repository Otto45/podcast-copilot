"use client"

import React, { useContext, useEffect } from 'react';
import { CopilotContext } from '@/context/context';
import { MessageMarkdown } from '../message/message-markdown';
import { CopilotChatItem } from '@/types/types';

interface CopilotResearchProps {

}

export const CopilotResearch: React.FC<CopilotResearchProps> = () => {
    const {
        currentUserQuestion,
        copilotChatItems,
        setCopilotChatItems,
        userIsPrompting,
        setUserIsPrompting
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

            setUserIsPrompting(false);
        };

        if (currentUserQuestion) {
            doResearch();
        }

    }, [currentUserQuestion]);

    useEffect(() => {

    }, [userIsPrompting]);

    return (
        <>
            {
                copilotChatItems.map((copilotChatItem, index) => {
                    return (
                        <div key={index} className={copilotChatItem.role === 'user' ? "bg-slate-800" : "bg-slate-700"}>
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
            }
            {
                userIsPrompting &&
                <>
                    <div className="bg-slate-800">
                        <div className="p-10">
                            <MessageMarkdown content="" copilotChatRole="user" />
                        </div>
                    </div>
                    <div className="bg-slate-700">
                        <div className="p-10">
                            <MessageMarkdown content="Hello! What can I look up for you?" copilotChatRole="copilot" />
                        </div>
                    </div>
                </>
            }
        </>
    );
};
