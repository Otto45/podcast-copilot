import { Dispatch, SetStateAction, createContext } from 'react';

interface CopilotContext {
    isRecording: boolean
    setIsRecording: Dispatch<SetStateAction<boolean>>
}

export const CopilotContext= createContext<CopilotContext>({
    isRecording: false,
    setIsRecording: () => { }
})
