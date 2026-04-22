import { GoogleGenAI } from "@google/genai";
import { PokemonHelperDTO } from "../dtos/pokemon-helper.dto";

export interface PokemonResposne {
    [pokemonId: string]: string;
}

export const getPokemonHelpUseCase = async (ai: GoogleGenAI, pokemonHelpDto: PokemonHelperDTO) => {
    const { name } = pokemonHelpDto;


    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `The Pokemon to defeat is ${ name }`,
        config: {
            responseMimeType: 'application/json',
            systemInstruction: `You are a Pokédex that provides recommendations on which Pokémon to use in battles against other Pokémon.
        Return a JSON response containing the Pokémon's ID and a super-effective move against the Pokémon provided.
        Always return 4 Pokémon.
        Here is the response format:
        {
          1: "tackle",
          20: "quick-attack",
          23: "thunderbolt",
          25: "thunde"
        }
        
        Just return the JSON object; do not provide explanations or anything else.`
        }
    });
    const jsonResponse = JSON.parse(response.text ?? '{}');
    return jsonResponse as PokemonResposne;
}