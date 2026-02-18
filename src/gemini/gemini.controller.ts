import { Body, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import type { Response } from 'express';
import { GeminiService } from './gemini.service';
import { basicPromptDTO } from './dtos/basic-prompt-dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) { }

  @Post('basic-prompt')
  basicPrompt(@Body() basicPromptDto: basicPromptDTO) {
    return this.geminiService.basicPrompt(basicPromptDto);
  }

  @Post('basic-prompt-stream')
  @UseInterceptors(FilesInterceptor('files'))
  async basicPromptStream(@Body() basicPromptDto: basicPromptDTO, @Res() res: Response, @UploadedFiles() files: Array<Express.Multer.File>) {
    basicPromptDto.files = files;
    const stream = await this.geminiService.basicPromptStream(basicPromptDto);
    res.setHeader('Content-Type', 'text/plain');
    res.status(HttpStatus.OK);
    for await (const chunk of stream) {
      const piece = chunk.text;
      res.write(piece);
    }
    res.end();
  }
}
