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
    if (!users.length) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async updateText(id_text: number, request: DataRequest): Promise<any> {
    try {
      const updatedText = await this.titleRepository.updateByIdText(
        id_text,
        request,
      );
      //console.log('service ==>', updatedText, id_text);
      if (!updatedText) {
        throw new NotFoundException('Texto não localizado!');
      }
      return updatedText;
    } catch (error) {
      throw new NotFoundException('Texto não localizado!');
    }
  }
  async updateTitle(id_text: number, request: DataRequest): Promise<any> {
    try {
      //console.log('request ==>', request.title);
      const updateByIdTitle = await this.titleRepository.updateByIdTitle(
        id_text,
        request,
      );
      //console.log('service ==>', updateByIdTitle, id_text);
      if (!updateByIdTitle) {
        throw new NotFoundException('Título não localizado!');
      }
      return updateByIdTitle;
    } catch (error) {
      throw new NotFoundException('Título não localizado!');
    }
  }

  async updateSubTitle(id_text: number, request: DataRequest): Promise<any> {
    try {
      const updateByIdSubTitle = await this.titleRepository.updateByIdSubTitle(
        id_text,
        request,
      );
      //console.log('service ==>', updateByIdSubTitle, id_text);
      if (!updateByIdSubTitle) {
        throw new NotFoundException('Sub Título não localizado!');
      }
      return updateByIdSubTitle;
    } catch (error) {
      throw new NotFoundException('Sub Título não localizado!');
    }
  }

  async updateAnyText(id_text: number, request: DataRequest): Promise<any> {
    try {
      const updateByIdAnyText = await this.titleRepository.updateByIdAnyText(
        id_text,
        request,
      );
      //console.log('service ==>', updateByIdAnyText, id_text);
      if (!updateByIdAnyText) {
        throw new NotFoundException('Sub Título não localizado!');
      }
      return updateByIdAnyText;
    } catch (error) {
      throw new NotFoundException('Sub Título não localizado!');
    }
  }

  //


}
