import { CopilotResearchQuestions } from '@/types/types';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Perplexity's API is OpenAI client compatible
const perplexityai = new OpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY,
    baseURL: "https://api.perplexity.ai"
});

export const runtime = 'edge';

const generateQuestionsPrompt: string = `You are a helpful assistant for podcast hosts.
Given a transcript for what the host and guest have recently discussed, come up with 1 question that is most relevant to the conversation.
The question should be one which has factual answers, not an opinion-based one. The question you come up with will be used to look up a factual answer online.
Please respond using JSON in the following format:

{
  "questions": [
    "<question>"
  ]
}

If you are unable to come up with a question which has factual answers, please respond with an empty array:
    
{
"questions": []
}
`;

const generateAnswersPrompt: string = `You are a helpful assistant.
Please answer the question(s) provided by the user. Include links to the sources you used to find the answer(s).`;

export async function POST(req: Request) {
    const { transcript } = await req.json();

    const generateQuestionsMessage: any = [
        { "role": "system", "content": generateQuestionsPrompt },
        { "role": "user", "content": transcript }
    ];

    const generateQuestionsResponse = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        stream: false,
        messages: generateQuestionsMessage
    });

    const questions = generateQuestionsResponse.choices[0].message.content;
    const questionsJSON: CopilotResearchQuestions = JSON.parse(questions!);

    if (questionsJSON.questions.length === 0) {
        return Response.json({ research: "" });
    }

    const getAnswersMessage: any = [
        { "role": "system", "content": generateAnswersPrompt },
        { "role": "user", "content": questionsJSON.questions[0] }
    ];

    const getAnswersResponse = await perplexityai.chat.completions.create({
        model: 'pplx-7b-online',
        messages: getAnswersMessage
    });

    let research = getAnswersResponse.choices[0].message.content;

    // Use markdown for formatting
    research = `### ${questionsJSON.questions[0]}\n\n${research}`;

    return Response.json({ research });
}
