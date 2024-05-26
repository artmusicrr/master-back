import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ImageRepository } from './entitiies/image.entities';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [ImageService, ImageRepository],
  controllers: [ImageController],
  imports: [DatabaseModule],
  exports: [ImageService],
})
export class ImageModule {}



