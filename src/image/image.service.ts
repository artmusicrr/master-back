import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ImageRepository } from './entitiies/image.entities';
import { Pool } from 'pg';
import { DataRequest } from 'src/interfaces/request.interface';


@Injectable()
export class ImageService {
  constructor(
    @Inject('PG_POOL') private readonly db: Pool,
    private readonly imageRepository: ImageRepository,
  ) {}

  async findAllImages(): Promise<any[]> {
    const users = await this.imageRepository.findAllImages();
    if (!users.length) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async createImage(request: DataRequest ): Promise<void> {
    const exists = await this.imageRepository.imageExists(request.img_home);
    if (exists) {
      throw new BadRequestException('Imagem já está em uso');
    }
    await this.imageRepository.createImage(request);
  }



}
