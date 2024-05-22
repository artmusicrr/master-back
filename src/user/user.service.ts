import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './entities/user.entities';
import { Pool } from 'pg';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('PG_POOL') private readonly db: Pool,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userRepository.findUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('E-mail já está em uso');
    }
    await this.userRepository.createUser(createUserDto);
  }

  async findAllUsers(): Promise<any[]> {
    const users = await this.userRepository.findAllUsers();
    if (!users.length) {
      throw new NotFoundException('No users found');
    }
    return users;
  }

  async updateUser(
    id_user: number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      const updatedUser = await this.userRepository.updateById(
        id_user,
        updateUserDto,
      );
      if (!updatedUser) {
        throw new NotFoundException('Usuário não localizado!');
      }
      return updatedUser;
    } catch (error) {
      throw new NotFoundException('Usuário não localizado!');
    }
  }

  async DeleteUser(id_user: number): Promise<any> {
    try {
      const user = await this.userRepository.deleteUser(id_user);
      if (!user) {
        throw new Error('Usuário não localizado!');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserByUsername(name: string): Promise<any> {
    try {
      const data = await this.userRepository.findByName(name);
      if (!data) {
        throw new Error('Usuário não localizado');
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getByLogin(name: string): Promise<any> {
    try {
      const data = await this.userRepository.findUserLogin(name);
      if (!data) {
        throw new Error('Usuário não localizado');
      }
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async saveByResetToken(
    id_user: string,
    resetToken: string,
    expirationDate: Date,
  ): Promise<void> {
    try {
      await this.userRepository.saveResetToken(
        id_user,
        resetToken,
        expirationDate,
      );
    } catch (error) {
      throw new HttpException(
        'Erro ao salvar o token de redefinição',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findUserLogin(name: string): Promise<any> {
    try {
      const query = `
       SELECT id_user, name, email, password,  registration_date, active
       FROM public.users
       WHERE name = $1;`;
      const result = await this.db.query(query, [name]);
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao executar a consulta');
    }
  }
  async updateUserPassword(token: string, password: string): Promise<void> {
    try {
      await this.userRepository.updateUserPassword(token, password);
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
