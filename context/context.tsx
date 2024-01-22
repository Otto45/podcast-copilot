import { RealtimeService } from 'assemblyai';
import { Dispatch, SetStateAction, createContext } from 'react';

interface CopilotContext {
    audioRecorder: MediaRecorder | null,
    setAudioRecorder: Dispatch<SetStateAction<MediaRecorder | null>>,

    rtTranscriber: RealtimeService | null,
    setRtTranscriber: Dispatch<SetStateAction<RealtimeService | null>>,

    isRecording: boolean,
    setIsRecording: Dispatch<SetStateAction<boolean>>,

    transcript: string,
    setTranscript: Dispatch<SetStateAction<string>>
}

export const CopilotContext= createContext<CopilotContext>({
    audioRecorder: null,
    setAudioRecorder: () => { },

    rtTranscriber: null,
    setRtTranscriber: () => { },

    isRecording: false,
    setIsRecording: () => { },

    transcript: '',
    setTranscript: () => { }
})
