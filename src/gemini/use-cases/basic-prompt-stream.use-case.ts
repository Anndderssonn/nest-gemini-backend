import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";
import { basicPromptDTO } from "../dtos/basic-prompt-dto";
import { Options } from "supertest";

export const basicPromptStreamUseCase = async (ai: GoogleGenAI, basicPromptDto: basicPromptDTO, options?: Options) => {
    const { prompt, files = [] } = basicPromptDto;

    const images = await Promise.all(
        files.map((file) => {
            return ai.files.upload({
                file: new Blob([new Uint8Array(file.buffer)], { type: file.mimetype.includes('image') ? file.mimetype : 'image/jpg' }),
            });
        }
        ));

    const response = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: [
            createUserContent([
                prompt,
                ...images.map((image) => createPartFromUri(image.uri ?? '', image.mimeType ?? ''))
            ])
        ],
        config: {
            systemInstruction: 'Respond only in English and in Markdown format'
        }
    });
    return response;
}