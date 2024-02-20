import { Dispatch, SetStateAction, createContext } from 'react';

interface CopilotContext {
    isRecording: boolean,
    setIsRecording: Dispatch<SetStateAction<boolean>>,

    transcript: string,
    setTranscript: Dispatch<SetStateAction<string>>,

    userSearchQuestion: string | null,
    setUserSearchQuestion: Dispatch<SetStateAction<string | null>>,

    userSearchAnswers: Array<string>,
    setUserSearchAnswers: Dispatch<SetStateAction<Array<string>>>
}

export const CopilotContext = createContext<CopilotContext>({
    isRecording: false,
    setIsRecording: () => { },

    transcript: '',
    setTranscript: () => { },

    userSearchQuestion: null,
    setUserSearchQuestion: () => { },

    userSearchAnswers: new Array<string>(),
    setUserSearchAnswers: () => { }
})
