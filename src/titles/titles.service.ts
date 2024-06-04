import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TitleRepository } from './entities/text.entities';
import { Pool } from 'pg';
import { DataRequest } from 'src/interfaces/request.interface';

@Injectable()
export class TitlesService {
  constructor(
    @Inject('PG_POOL') private readonly db: Pool,
    private readonly titleRepository: TitleRepository,
  ) {}

  async findAllUsers(): Promise<any[]> {
    const users = await this.titleRepository.findAllTitle();
    if (!users) {
      throw new NotFoundException(`No users found`);
    }
    return users;
  }

  async updateText(id_text: number, request: DataRequest): Promise<any> {
    const updatedText = await this.titleRepository.updateByIdText(
      id_text,
      request,
    );
    if (!updatedText) {
      throw new NotFoundException(`Texto do ID ${id_text} não localizado!`);
    }
    return updatedText;
  }
  async updateTitle(id_text: number, request: DataRequest): Promise<any> {
    const updateByIdTitle = await this.titleRepository.updateByIdTitle(
      id_text,
      request,
    );
    if (!updateByIdTitle) {
      throw new NotFoundException(`Título do ID ${id_text} não localizado!`);
    }
    return updateByIdTitle;
  }

  async updateSubTitle(id_text: number, request: DataRequest): Promise<any> {
    const updateByIdSubTitle = await this.titleRepository.updateByIdSubTitle(
      id_text,
      request,
    );

    if (!updateByIdSubTitle) {
      throw new NotFoundException(
        `Sub Título do ID ${id_text} não localizado!`,
      );
    }
    return updateByIdSubTitle;
  }

  async updateAnyText(id_text: number, request: DataRequest): Promise<any> {
    const updateByIdAnyText = await this.titleRepository.updateByIdAnyText(
      id_text,
      request,
    );
    if (!updateByIdAnyText) {
      throw new NotFoundException(
        `Sub Título do ID ${id_text} não localizado!`,
      );
    }
    return updateByIdAnyText;
  }

  async updateColorText(id_text: number, request: DataRequest): Promise<any> {
    console.log('request service >=>=>', request);

    const ColorText = await this.titleRepository.updateByIdColorText(
      id_text,
      request,
    );
    if (!ColorText) {
      throw new NotFoundException(`Cor do ID ${id_text} não localizado!`);
    }
    return ColorText;
  }

  //
}
