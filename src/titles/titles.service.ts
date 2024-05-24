import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { TitleRepository } from './entities/text.entities';
import { Pool } from 'pg';
import { DataRequest } from 'src/interfaces/request.interface';
//import { CreateUserDto, UpdateUserDto } from './entities/user.dto';

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

  async updateTitle(id_text: number, request: DataRequest): Promise<any> {
    try {
      const updatedTitle = await this.titleRepository.updateById(
        id_text,
        request,
      );
      console.log('service ==>', updatedTitle, id_text);
      if (!updatedTitle) {
        throw new NotFoundException('Texto não localizado!');
      }
      return updatedTitle;
    } catch (error) {
      throw new NotFoundException('Texto não localizado!');
    }
  }

  //

  //   async getUserByUsername(name: string): Promise<any> {
  //     try {
  //       const data = await this.userRepository.findByName(name);
  //       if (!data) {
  //         throw new Error('Usuário não localizado');
  //       }
  //       return data;
  //     } catch (error) {
  //       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //     }
  //   }
}
