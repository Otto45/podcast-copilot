import { CopilotSuggestedQuestions } from '@/types/types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

const copilotSuggestionsPrompt: string = `You are a helpful assistant for podcast hosts.
Given a transcript for what the host and guest have recently discussed, suggest questions to ask the guest.
Please only suggest 1 question that is most relevant to the conversation.
Respond using JSON in the following format:

{
  "questions": [
    "<question>"
  ]
}

If you are unable to come up with a question for the given transcript, please respond with an empty array:
    
{
"questions": []
}
`;

export async function POST(req: Request) {
  const { transcript } = await req.json();

  const messages: any = [
    { "role": "system", "content": copilotSuggestionsPrompt },
    { "role": "user", "content": transcript }
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: false,
    messages
  });

  const suggestions = response.choices[0].message.content;
  const suggestionsJSON: CopilotSuggestedQuestions = JSON.parse(suggestions!);

  return Response.json(suggestionsJSON);
}
