import { Dispatch, SetStateAction, createContext } from 'react';

interface CopilotContext {
    isRecording: boolean,
    setIsRecording: Dispatch<SetStateAction<boolean>>,

    transcript: string,
    setTranscript: Dispatch<SetStateAction<string>>

    sidebarIsOpen: boolean,
    setSidebarIsOpen: Dispatch<SetStateAction<boolean>>
}

export const CopilotContext = createContext<CopilotContext>({
    isRecording: false,
    setIsRecording: () => { },

    transcript: '',
    setTranscript: () => { },

    sidebarIsOpen: false,
    setSidebarIsOpen: () => { }
})
