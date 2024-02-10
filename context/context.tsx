import { Dispatch, SetStateAction, createContext } from 'react';

interface CopilotContext {
    isRecording: boolean,
    setIsRecording: Dispatch<SetStateAction<boolean>>,

    transcript: string,
    setTranscript: Dispatch<SetStateAction<string>>
}

export const CopilotContext = createContext<CopilotContext>({
    isRecording: false,
    setIsRecording: () => { },

    transcript: '',
    setTranscript: () => { }
})
