import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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
    console.log('[UserService] Creating new user:', { email: createUserDto.email });
    const user = await this.userRepository.findUserByEmail(createUserDto.email);
    if (user) {
      console.log('[UserService] Email already exists:', createUserDto.email);
      throw new NotFoundException(`Email ${createUserDto.email} ja existe`);
    }
    await this.userRepository.createUser(createUserDto);
    console.log('[UserService] User created successfully');
  }

  async findAllUsers(): Promise<any[]> {
    console.log('[UserService] Fetching all users');
    const users = await this.userRepository.findAllUsers();
    if (!users.length) {
      console.log('[UserService] No users found');
      throw new NotFoundException('Nenhum Usuário encontrado');
    }
    console.log('[UserService] Found', users.length, 'users');
    return users;
  }

  async updateUser(
    id_user: number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    console.log('[UserService] Updating user:', { id_user, ...updateUserDto });
    const updatedUser = await this.userRepository.updateById(
      id_user,
      updateUserDto,
    );
    if (!updatedUser) {
      console.log('[UserService] User not found:', id_user);
      throw new NotFoundException(`Usuário ${id_user} não encontrado`);
    }
    console.log('[UserService] User updated successfully:', id_user);
    return updatedUser;
  }

  async DeleteUser(id_user: number): Promise<any> {
    console.log('[UserService] Deleting user:', id_user);
    const user = await this.userRepository.deleteUser(id_user);
    if (!user) {
      console.log('[UserService] User not found:', id_user);
      throw new Error(`Usuário ${id_user} não encontrado`);
    }
    console.log('[UserService] User deleted successfully:', id_user);
    return user;
  }

  async getUserByUsername(name: string): Promise<any> {
    const data = await this.userRepository.findByName(name);
    if (!data) {
      throw new Error(`Usuário ${name} não encontrado`);
    }
    return data;
  }

  async getByLogin(name: string): Promise<any> {
    const data = await this.userRepository.findUserLogin(name);
    if (!data) {
      throw new Error(`Usuário ${name} não encontrado`);
    }
    return data;
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
      throw new NotFoundException(`Erro ao salvar o token de redefinição`);
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
      throw new NotFoundException('Erro ao executar a consulta');
    }
  }

  async updateUserPassword(token: string, password: string): Promise<void> {
    try {
      await this.userRepository.updateUserPassword(token, password);
    } catch (error) {
      throw new NotFoundException('Erro ao atualizar a senha');
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const query = `
        SELECT id_user, name, email, registration_date, active, oauth_provider, oauth_id
        FROM public.users
        WHERE email = $1;`;
      const result = await this.db.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      return null;
    }
  }

  async create(userData: {
    name: string;
    email: string;
    oauth_provider?: string;
    oauth_id?: string;
  }): Promise<any> {
    try {
      const query = `
        INSERT INTO public.users (name, email, oauth_provider, oauth_id, registration_date, active)
        VALUES ($1, $2, $3, $4, NOW(), true)
        RETURNING id_user, name, email, registration_date, active, oauth_provider, oauth_id;`;

      const result = await this.db.query(query, [
        userData.name,
        userData.email,
        userData.oauth_provider || null,
        userData.oauth_id || null,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Could not create user');
    }
  }
}
