import { CopilotChatItem } from '@/types/types';
import { Dispatch, SetStateAction, createContext } from 'react';

interface CopilotContext {
    isRecording: boolean,
    setIsRecording: Dispatch<SetStateAction<boolean>>,

    transcript: string,
    setTranscript: Dispatch<SetStateAction<string>>,

    currentUserQuestion: string | null,
    setCurrentUserQuestion: Dispatch<SetStateAction<string | null>>,

    copilotChatItems: Array<CopilotChatItem>,
    setCopilotChatItems: Dispatch<SetStateAction<Array<CopilotChatItem>>>,

    
}

export const CopilotContext = createContext<CopilotContext>({
    isRecording: false,
    setIsRecording: () => { },

    transcript: '',
    setTranscript: () => { },

    currentUserQuestion: null,
    setCurrentUserQuestion: () => { },

    copilotChatItems: new Array<CopilotChatItem>(),
    setCopilotChatItems: () => { }
})
