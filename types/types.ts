export interface CopilotSuggestedQuestions {
    questions: Array<string>;
}

export interface CopilotChatItem {
    role: 'user' | 'copilot';
    content: string;
}
