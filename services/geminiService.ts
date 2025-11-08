import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { REPORT_PROMPT_TEMPLATES } from '../constants';
import { Language } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getChatResponse = async (prompt: string): Promise<GenerateContentResponse> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        return response;
    } catch (error) {
        console.error("Error getting chat response from Gemini:", error);
        throw error;
    }
};

export const generateDailyReport = async (language: Language, stocks: string[] = []): Promise<GenerateContentResponse> => {
    try {
        const date = new Date().toLocaleDateString(language === 'he' ? 'he-IL' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        
        let prompt: string;
        if (stocks.length > 0) {
            prompt = REPORT_PROMPT_TEMPLATES[language].specific
                .replace("{date}", date)
                .replace("{stocks}", stocks.join(', '));
        } else {
            // This case might not be used if the button is disabled, but it's good for fallback.
            prompt = REPORT_PROMPT_TEMPLATES[language].generic
                .replace("{date}", date);
        }
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        return response;
    } catch (error) {
        console.error("Error generating daily report from Gemini:", error);
        throw error;
    }
};

export const generatePodcast = async (text: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Puck' }, // A voice similar to those in NotebookLM
                    },
                },
            },
        });
        
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
            return base64Audio;
        }
        return null;
    } catch (error) {
        console.error("Error generating podcast from Gemini:", error);
        throw error;
    }
};
