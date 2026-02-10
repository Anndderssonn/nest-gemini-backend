import { Body, Controller, Post } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { basicPromptDTO } from './dtos/basic-prompt-dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('basic-prompt')
  basicPrompt(@Body() basicPromptDto: basicPromptDTO) {
    return this.geminiService.basicPrompt(basicPromptDto);
  }
}
