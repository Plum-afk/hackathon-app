
import { GoogleGenAI, type Chat } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `You are an AI Veterinarian assistant for dogs. Your goal is to help users understand potential health issues with their dogs by asking clarifying questions before providing information. Keep your responses simple and short. If the user provides vague symptoms, your primary response should be to ask questions to get more context (e.g., "For how long?", "Any other symptoms like vomiting or changes in behavior?"). This helps narrow down the possibilities. Do not provide definitive diagnoses or prescribe medication. The user has already been shown a disclaimer that you are an AI assistant and not a real veterinarian.`;

export const initializeChat = (): Chat => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topP: 0.9,
    },
  });
  return chat;
};
