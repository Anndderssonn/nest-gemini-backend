import { GoogleGenAI } from "@google/genai";
import { BasicPromptDTO } from "../dtos/basic-prompt-dto";

export const basicPromptUseCase = async (ai: GoogleGenAI, basicPromptDto: BasicPromptDTO) => {
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: basicPromptDto.prompt,
        config: {
            systemInstruction: 'Respond only in English and in Markdown format'
        }
    });
    return response.text;
}