import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DataRequest } from '../interfaces/request.interface';
import { Client } from 'pg';
import { UserRepository } from './entities/user.entities';

@Injectable()
export class UserService {
  request: any;
  userEntity: any;
  userRepo: UserRepository;
  constructor(
    @Inject(DatabaseModule.PG_POOL)
    private readonly db: Client,
  ) {
    this.userRepo = new UserRepository(db);
  }

  async findUser(): Promise<any> {
    try {
      const data = await this.userRepo.findAllUsers();
      console.log('service =====>', data);
      if (!data) {
        throw new Error('Usuário não localizado!!!=========');
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async UpdateUser(id_user: number, request: DataRequest): Promise<any> {
    try {
      const data = await this.userRepo.updateById(id_user, request);
      if (!data) {
        throw new Error('Usuário não localizado!!!=========');
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async DeleteUser(id_user: number, request: DataRequest): Promise<any> {
    try {
      const data = await this.userRepo.deleteUser(id_user, request);
      if (!data) {
        throw new Error('Usuário não localizado!!!=========');
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async CreateUser( request: DataRequest): Promise<any> {
    try {
      const data = await this.userRepo.createUser(request);
      // if () {
      //   throw new Error('Usuário não localizado!!!=========');
      // }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
