import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Delete,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GalleryService } from './gallery.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/gallery',
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadGalleryImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
  ) {
    
    const image_url = `/uploads/gallery/${file.filename}`;
    return this.galleryService.saveGalleryImage(image_url, description);
  }

  @Get('images')
  async listGalleryImages() {
    return this.galleryService.listGalleryImages();
  }

  @Delete('image/:filename')
  async deleteImage(@Param('filename') filename: string) {
    console.log('Tentando excluir arquivo:', filename);
    try {
      return await this.galleryService.deleteGalleryImage(filename);
    } catch (error) {
      throw new HttpException(
        error.message || 'Falha ao deletar a imagem',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
