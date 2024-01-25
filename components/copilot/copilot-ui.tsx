"use client"

import React, { FC, useContext, useEffect, useRef } from 'react';
import { CopilotResearch } from '@/components/copilot/copilot-research';
import { CopilotSuggestions } from '@/components/copilot/copilot-suggestions';
import { CopilotContext } from '@/context/context';
import { RealtimeService, FinalTranscript } from 'assemblyai';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import { loremIpsum } from '@/lib/lorem-ipsum';

interface CopilotUiProps {

}

export const CopilotUi: FC<CopilotUiProps> = () => {

    const {
        isRecording,
        setIsRecording,
        transcript,
        setTranscript
    } = useContext(CopilotContext);

    const rtTranscriberRef = useRef<RealtimeService>();
    const recordRtcRef = useRef<RecordRTC>();
    const transcriptRef = useRef<string>('');

    useEffect(() => {
        const initCopilot = async () => {
            try {
                setTranscript(transcriptRef.current);

                const assemblyAiTokenResponse = await fetch('/api/transcription-auth-token');
                const assemblyAiTokenJson = await assemblyAiTokenResponse.json();
                const assemblyAiToken = assemblyAiTokenJson.token;
                const rt = new RealtimeService({ token: assemblyAiToken });

                rt.on("open", ({ sessionId, expiresAt }) => console.log('Session ID:', sessionId, 'Expires at:', expiresAt));
                rt.on("close", (code: number, reason: string) => console.log('Closed', code, reason));
                rt.on("error", (error: Error) => console.error('Error', error));

                rt.on("transcript.final", (finalTranscript: FinalTranscript) => {
                    transcriptRef.current += finalTranscript.text;
                    setTranscript(transcriptRef.current);
                });

                rtTranscriberRef.current = rt;

                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

                recordRtcRef.current = new RecordRTC(audioStream, {
                    type: "audio",
                    mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
                    recorderType: StereoAudioRecorder,
                    timeSlice: 250, // AssemblyAI recommends sending between 100ms and 450ms of audio at a time.
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1, // realtime requires only one channel
                    bufferSize: 16384,
                    audioBitsPerSecond: 128000,
                    ondataavailable: async (blob: Blob) => {
                        rtTranscriberRef.current!.sendAudio(await blob.arrayBuffer());
                    },
                    disableLogs: true
                });

            } catch (error) {
                // Handle error here
                console.error(error);
            }
        };

        initCopilot();
    }, []);

    const startRecording = () => {
        rtTranscriberRef.current!.connect();
        recordRtcRef.current!.startRecording();

        setIsRecording(true);
    };

    const stopRecording = () => {
        recordRtcRef.current!.stopRecording();
        rtTranscriberRef.current!.close();

        setIsRecording(false);
    };

    return (
        <div className="flex flex-col h-full w-full">
            {isRecording ? (
                <>
                    <div className="flex w-full flex-row items-center justify-evenly mb-24">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => stopRecording()}
                        >
                            Stop Listening
                        </button>
                    </div>
                    <div className="flex h-full w-full flex-row items-center justify-evenly">
                        <div className="overflow-auto overscroll-auto h-full w-1/3">
                            <CopilotSuggestions />
                        </div>
                        <div className="overflow-auto overscroll-auto h-full w-1/3">
                            <CopilotResearch />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => startRecording()}
                    >
                        Start Listening
                    </button>
                </div>
            )}
        </div>
    );
};
