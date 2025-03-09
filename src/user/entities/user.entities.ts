import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async createUser(request: CreateUserDto): Promise<void> {
    try {
      console.log('[UserRepository] Creating user:', { email: request.email });
      const { name, email, password, flag_active } = request;
      const hashedPassword = bcrypt.hashSync(password, 8);
      const query = `INSERT INTO public.users (name, email, password, registration_date, flag_active) 
                     VALUES ($1, $2, $3, NOW(), $4)`;
      await this.db.query(query, [name, email, hashedPassword, flag_active]);
      console.log('[UserRepository] User created successfully');
    } catch (error: any) {
      console.error('[UserRepository] Error creating user:', error.message);
      throw new Error('Erro ao executar a consulta');
    }
  }

  async findUserByEmail(email: string): Promise<any> {
    console.log('[UserRepository] Finding user by email:', email);
    const query = `SELECT * FROM public.users WHERE email = $1`;
    const result = await this.db.query(query, [email]);
    console.log('[UserRepository] User found:', !!result.rows[0]);
    return result.rows[0];
  }

  async findAllUsers(): Promise<any> {
    try {
      console.log('[UserRepository] Fetching all users');
      const query = `SELECT * FROM public.users`;
      const result = await this.db.query(query);
      console.log('[UserRepository] Found', result.rows.length, 'users');
      return result.rows;
    } catch (error) {
      console.error('[UserRepository] Error fetching users:', error);
      throw new Error('Erro ao executar a consulta');
    }
  }

  async updateById(id_user: number, request: UpdateUserDto): Promise<any> {
    console.log('[UserRepository] Updating user:', { id_user, ...request });
    const { name, email } = request;
    const query = `UPDATE public.users SET name = $1, email = $2, update_date = NOW() WHERE id_user = $3 RETURNING *`;
    const values = [name, email, id_user];
    const result = await this.db.query(query, values);
    console.log('[UserRepository] User updated:', !!result.rows[0]);
    return result.rows[0];
  }

  async deleteUser(id_user: number): Promise<any> {
    try {
      console.log('[UserRepository] Deleting user:', id_user);
      const query = `DELETE FROM public.users WHERE id_user = $1 RETURNING *`;
      const result = await this.db.query(query, [id_user]);
      console.log('[UserRepository] User deleted:', !!result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('[UserRepository] Error deleting user:', error);
      throw new Error('Erro ao executar a consulta');
    }
  }

  async findByName(name: string): Promise<any> {
    try {
      const query = `
      SELECT * FROM public.users where name = '${name}';`;
      const result = await this.db.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error('Erro ao executar a consulta');
    }
  }

  async saveResetToken(
    id_user: string,
    resetToken: string,
    expirationDate: Date,
  ): Promise<void> {
    try {
      console.log('[UserRepository] Saving reset token for user:', id_user);
      const query = `
        UPDATE public.users
        SET reset_token = $1, reset_token_expiration = $2
        WHERE id_user = $3;`;
      const values = [resetToken, expirationDate, id_user];
      await this.db.query(query, values);
      console.log('[UserRepository] Reset token saved successfully');
    } catch (error) {
      console.error('[UserRepository] Error saving reset token:', error);
      throw new Error('Erro ao executar a consulta');
    }
  }

  async findUserLogin(name: string): Promise<any> {
    try {
      const query = `
       SELECT id_user, name, email, password,  registration_date, flag_active
       FROM public.users
       WHERE name = $1;`;
      const result = await this.db.query(query, [name]);
      // console.log('======', result);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao executar a consulta');
    }
  }

  async updateUserPassword(
    reset_token: string,
    password: string,
  ): Promise<any> {
    try {
      const queryCheckToken = `
      SELECT * FROM public.users
      WHERE reset_token = $1;`;
      const result = await this.db.query(queryCheckToken, [reset_token]);
      if (result.rowCount === 0) {
        throw new HttpException('Token não encontrado', HttpStatus.NOT_FOUND);
      }

      const { reset_token_expiration } = result.rows[0];
      const tokenExpirationDate = new Date(reset_token_expiration);
      const now = new Date();

      const diffInMinutes =
        (now.getTime() - tokenExpirationDate.getTime()) / 1000 / 24; // 120000/24 = 5 minutos
      if (diffInMinutes > 2) {
        throw new HttpException('Token expirado', HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = bcrypt.hashSync(password, 8);

      const queryUpdatePassword = `
      UPDATE public.users
      SET password = $2
      WHERE reset_token = $1;`;
      const values = [reset_token, hashedPassword];
      const data = await this.db.query(queryUpdatePassword, values);
      if (data.rowCount === 0) {
        throw new HttpException('Token não encontrado', HttpStatus.NOT_FOUND);
      }

      const queryResetToken = `
      UPDATE public.users
      SET reset_token = null
      WHERE reset_token = $1;`;
      await this.db.query(queryResetToken, [reset_token]);
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao executar a consulta');
    }
  }
  async findUserByResetToken(token: string): Promise<any> {
    const query = 'SELECT * FROM public.users WHERE reset_token = $1';
    const result = await this.db.query(query, [token]);
    return result.rows[0];
  }
}
