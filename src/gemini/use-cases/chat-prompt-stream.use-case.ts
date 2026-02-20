import { Content, createPartFromUri, GoogleGenAI } from "@google/genai";
import { ChatPromptDto } from "../dtos/chat-prompt.dto";
import { geminiUploadFiles } from "../helpers/gemini-upload-files";

interface Options {
    model?: string;
    systemInstruction?: string;
    history: Content[];
}

export const chatPromptStreamUseCase = async (ai: GoogleGenAI, chatPromptDto: ChatPromptDto, options?: Options) => {
    const { prompt, files = [] } = chatPromptDto;
    const filesUploaded = await geminiUploadFiles(ai, files);
    const {
        model = "gemini-3-flash-preview",
        systemInstruction = "Respond only in English and in Markdown format",
        history = []
    } = options ?? {};

    const chat = ai.chats.create({
        model: model,
        config: {
            systemInstruction: systemInstruction
        },
        history: history,
    });
    return chat.sendMessageStream({
        message: [
            prompt,
            ...filesUploaded.map(file => createPartFromUri(
                file.uri ?? '', file.mimeType ?? ''
            ))
        ]
    });
};