"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import { CopilotResearch } from '@/components/copilot/copilot-research';
import { CopilotSuggestions } from '@/components/copilot/copilot-suggestions';
import { CopilotContext } from '@/context/context';
import { RealtimeService, PartialTranscript, FinalTranscript } from "assemblyai";
//@ts-ignore
import RecordRTC, { StereoAudioRecorder } from "recordrtc";

export default function Copilot() {

    const {
        isRecording,
        setIsRecording,
        transcript,
        setTranscript
    } = useContext(CopilotContext);

    const rtTranscriberRef = useRef<RealtimeService>();
    const recordRtcRef = useRef<RecordRTC>();

    useEffect(() => {
        const initCopilot = async () => {
            try {
                const assemblyAiTokenResponse = await fetch('/api/transcription-auth-token');
                const assemblyAiTokenJson = await assemblyAiTokenResponse.json();
                const assemblyAiToken = assemblyAiTokenJson.token;
                const rt = new RealtimeService({ token: assemblyAiToken });

                rt.on("open", ({ sessionId, expiresAt }) => console.log('Session ID:', sessionId, 'Expires at:', expiresAt));
                rt.on("close", (code: number, reason: string) => console.log('Closed', code, reason));
                rt.on("error", (error: Error) => console.error('Error', error));

                // rt.on("transcript.partial", (partialTranscript: PartialTranscript) => {
                //     setTranscript(transcript + partialTranscript.text);
                // });

                rt.on("transcript.final", (finalTranscript: FinalTranscript) => {
                    setTranscript(transcript + finalTranscript.text);
                });

                rtTranscriberRef.current = rt;

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                recordRtcRef.current = new RecordRTC(stream, {
                    type: "audio",
                    mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
                    recorderType: StereoAudioRecorder,
                    timeSlice: 250, // AssemblyAI recommends sending between 100ms and 450ms of audio at a time
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1, // realtime requires only one channel
                    bufferSize: 16384,
                    audioBitsPerSecond: 128000,
                    ondataavailable: async (blob: Blob) => {
                        rtTranscriberRef.current!.sendAudio(await blob.arrayBuffer());
                    }
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
        <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
            {isRecording ? (
                <>
                    <div className="flex min-w-full flex-row items-center justify-evenly">
                        <div>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => stopRecording()}
                            >
                                Stop Recording
                            </button>
                        </div>
                    </div>
                    <div className="flex min-w-full flex-row items-center justify-evenly">
                        <div>
                            <CopilotSuggestions />
                        </div>
                        <div>
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
                        Start Recording
                    </button>
                </div>
            )}
        </main>
    );
};
