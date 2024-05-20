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

  async findOneByEmail(name: string): Promise<any> {
    const user = await this.userRepository.findUserByEmail(name);
    if (!user) {
      throw new NotFoundException('Usuário não localizado!');
    }
    return user;
  }

  async getUserByUsername(name: string): Promise<any> {
    try {
      const data = await this.userRepository.findByName(name);
      console.log('xxxxxx', name, data);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
