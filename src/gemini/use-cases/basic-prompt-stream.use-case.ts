import { GoogleGenAI } from "@google/genai";
import { basicPromptDTO } from "../dtos/basic-prompt-dto";

export const basicPromptStreamUseCase = async (ai: GoogleGenAI, basicPromptDto: basicPromptDTO) => {
    const response = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: basicPromptDto.prompt,
        config: {
            systemInstruction: 'Respond only in English and in Markdown format'
        }
    });
    return response;
}