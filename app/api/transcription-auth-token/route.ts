import { AssemblyAI } from "assemblyai";

export const runtime = 'edge'

export async function GET() {
    const client = new AssemblyAI({
        apiKey: process.env.ASSEMBLYAI_API_KEY!
    });

    const token = await client.realtime.createTemporaryToken({ expires_in: 21600 }); // 6 hours

    return Response.json({ token });
}
