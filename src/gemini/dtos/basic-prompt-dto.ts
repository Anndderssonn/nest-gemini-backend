import { IsNotEmpty, IsString } from "class-validator";

export class basicPromptDTO {
    @IsString()
    @IsNotEmpty()
    prompt: string;
}