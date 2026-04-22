import { IsNotEmpty, IsString } from "class-validator";

export class TriviaQuestionDTO {
    @IsString()
    @IsNotEmpty()
    topic: string;
}