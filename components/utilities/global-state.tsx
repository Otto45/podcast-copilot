"use client"

import { CopilotContext } from '@/context/context';
import { RealtimeService } from 'assemblyai';
import React, { FC, useState } from 'react';

interface GlobalStateProps {
    children: React.ReactNode
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(null);
    const [rtTranscriber, setRtTranscriber] = useState<RealtimeService | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('');

    return (
        <CopilotContext.Provider
            value={{
                audioRecorder,
                setAudioRecorder,

                rtTranscriber,
                setRtTranscriber,

                isRecording,
                setIsRecording,
                
                transcript,
                setTranscript
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
