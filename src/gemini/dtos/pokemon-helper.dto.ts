import { IsNotEmpty, IsString } from "class-validator";

export class PokemonHelperDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}