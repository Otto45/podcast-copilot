import OpenAI from 'openai';

// Perplexity's API is OpenAI client compatible
const perplexityai = new OpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY,
    baseURL: "https://api.perplexity.ai"
});

export const runtime = 'edge';

const generateAnswersPrompt: string = `You are a helpful assistant.
Please answer the question(s) provided by the user below.`;

export async function POST(req: Request) {
    const { userSearchQuestion } = await req.json();

    // Perplexity's online models ignore the system messages, so concat our prompt with the user message
    const userMessage = `${generateAnswersPrompt}\n\n${userSearchQuestion}`;

    const getAnswersMessage: any = [
        { "role": "user", "content": userMessage }
    ];

    const getAnswersResponse = await perplexityai.chat.completions.create({
        model: 'pplx-7b-online',
        messages: getAnswersMessage
    });

    let research = getAnswersResponse.choices[0].message.content;

    return Response.json({ research });
}
