"use client"

import React, { FC, useContext, useEffect, useRef } from 'react';
import { CopilotResearch } from '@/components/copilot/copilot-research';
import { CopilotSuggestions } from '@/components/copilot/copilot-suggestions';
import { CopilotContext } from '@/context/context';
import { FinalTranscript, PartialTranscript, RealtimeTranscriber } from 'assemblyai';
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { ScrollableCardContent } from '../ui/scrollable-card-content';

const TIME_SLICE = 450; // ms

interface CopilotUiProps {

}

export const CopilotUi: FC<CopilotUiProps> = () => {

    const {
        isRecording,
        setIsRecording,
        setTranscript,
        setUserSearchQuestion
    } = useContext(CopilotContext);

    const assemblyAiToken = useRef<string | null>(null);
    const rtTranscriberRef = useRef<RealtimeTranscriber | null>(null);
    const recorderRef = useRef<RecordRTC | null>(null);
    const transcriptRef = useRef<string>('');
    const copilotPrompt = useRef<string | null>(null);
    const silenceCountRef = useRef<number>(0);

    useEffect(() => {
        const initCopilot = async () => {
            try {
                if (assemblyAiToken.current === null) {
                    const assemblyAiTokenResponse = await fetch('/api/transcription-auth-token');
                    const assemblyAiTokenJson = await assemblyAiTokenResponse.json();
                    assemblyAiToken.current = assemblyAiTokenJson.token;
                }
            } catch (error) {
                // Handle error here
                console.error(error);
            }
        };

        initCopilot();
    }, []);

    const createRecorder = async () => {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        recorderRef.current = new RecordRTC(audioStream, {
            type: "audio",
            mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
            recorderType: StereoAudioRecorder,
            timeSlice: TIME_SLICE, // AssemblyAI recommends sending between 100ms and 450ms of audio at a time.
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // realtime requires only one channel
            bufferSize: 16384,
            audioBitsPerSecond: 128000,
            ondataavailable: async (blob: Blob) => {
                rtTranscriberRef.current?.sendAudio(await blob.arrayBuffer());
            },
            disableLogs: true
        });
    };

    const createRealtimeTranscriber = () => {
        const rt = new RealtimeTranscriber({ token: assemblyAiToken.current! });

        rt.on("open", ({ sessionId, expiresAt }) => console.log('Live transcription session id:', sessionId, 'Expires at:', expiresAt));
        rt.on("close", (code: number, reason: string) => console.log('Live transcription session closed:', code, reason));
        rt.on("error", (error: Error) => console.error('Live transcription error:', error));
        
        
        rt.on("transcript.partial", (partialTranscript: PartialTranscript) => {
            if (partialTranscript.text.toLowerCase().includes('hey copilot')) {
                copilotPrompt.current = partialTranscript.text;
            }

            if (partialTranscript.text.length === 0) {
                silenceCountRef.current++;
            } else {
                silenceCountRef.current = 0;
            }
            
            if ((silenceCountRef.current * TIME_SLICE >= 1000) && copilotPrompt.current !== null) {
                const userSearchQuestion = copilotPrompt.current?.replace('hey copilot', '').trim();
                setUserSearchQuestion(userSearchQuestion);
                copilotPrompt.current = null;
            }
        });
        
        rt.on("transcript.final", (finalTranscript: FinalTranscript) => {
            transcriptRef.current += ` ${finalTranscript.text}`;
            setTranscript(transcriptRef.current);
        });

        rtTranscriberRef.current = rt;
    };

    const startRecording = async () => {
        transcriptRef.current = '';
        createRealtimeTranscriber();
        
        if (!recorderRef.current) {
            await createRecorder();
            recorderRef.current!.startRecording();
        } else {
            recorderRef.current!.resumeRecording();
        }
        
        rtTranscriberRef.current!.connect();

        setIsRecording(true);
    };

    const stopRecording = () => {
        recorderRef.current!.pauseRecording();
        rtTranscriberRef.current!.close();
        rtTranscriberRef.current = null;

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
                    <div className="flex h-5/6 w-full flex-row items-center justify-evenly">
                        <div className="flex h-full w-5/12 flex-col">
                            <Card className="flex flex-col h-full w-full overflow-hidden bg-slate-800">
                                <CardHeader className="bg-slate-900">
                                    <CardTitle>Suggested Questions</CardTitle>
                                </CardHeader>
                                <ScrollableCardContent className="flex-1 w-full p-0">
                                    <CopilotSuggestions />
                                </ScrollableCardContent>
                            </Card>
                        </div>
                        <div className="flex h-full w-5/12 flex-col">
                            <Card className="flex flex-col h-full w-full overflow-hidden bg-slate-800">
                                <CardHeader className="bg-slate-900">
                                    <CardTitle>Copilot Research</CardTitle>
                                </CardHeader>
                                <ScrollableCardContent className="flex-1 w-full p-0">
                                    <CopilotResearch />
                                </ScrollableCardContent>
                            </Card>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex h-full items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={async () => await startRecording()}
                    >
                        Start Listening
                    </button>
                </div>
            )}
        </div>
    );
};
