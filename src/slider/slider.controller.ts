// slider.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SliderService } from './slider.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('slides')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/slides',
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async updateSliderImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image_url = `/uploads/slides/${file.filename}`;
    // Aqui, apenas atualizamos o campo da imagem, ignorando title, sub_title e text
    return this.sliderService.updateImage(id, image_url);
  }

  @Get()
  async findAllSlides() {
    return this.sliderService.findAllSlides();
  }
}
