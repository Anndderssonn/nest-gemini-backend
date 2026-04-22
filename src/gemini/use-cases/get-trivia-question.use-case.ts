import { GoogleGenAI } from "@google/genai";
import { TriviaQuestionDTO } from "../dtos/trivia-question.dto";

export interface TriviaAnswer {
    question: string;
    answers: string[];
    correct: number;
}

export const getTriviaQuestionUseCase = async (ai: GoogleGenAI, triviaQusetionDto: TriviaQuestionDTO) => {
    const { topic } = triviaQusetionDto;


    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Give me a general knowledge question on the topic: ${ topic }`,
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `You are a trivia generator; you will be asked general knowledge questions,
      and you must generate three incorrect answers and one correct answer.
      The index should vary in position; occasionally, generate a question that is extremely difficult to answer.
        
       {
        question: “this is where the general question goes”
         answers: [
          “answer 1”,
          “answer 2”,
          “answer 3”,
          “answer 4”,
         ],
         correct: array index
       }
        
        Just return the JSON object; do not provide explanations or anything else.`
        }
    });
    const jsonResponse = JSON.parse(response.text ?? '{}');
    return jsonResponse as TriviaAnswer;
}