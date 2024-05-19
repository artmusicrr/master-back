import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async createUser(request: CreateUserDto): Promise<void> {
    try {
      const { name, email, password } = request;
      const hashedPassword = bcrypt.hashSync(password, 8);
      const query = `INSERT INTO public.users (name, email, password, registration_date) VALUES ($1, $2, $3, NOW())`;
      await this.db.query(query, [name, email, hashedPassword]);
    } catch (error: any) {
      console.log(error);
    }
  }
  async findUserByEmail(email: string): Promise<any> {
    const query = `SELECT * FROM public.users WHERE email = $1`;
    const result = await this.db.query(query, [email]);
    return result.rows[0];
  }

  async findAllUsers(): Promise<any> {
    try {
      const query = `SELECT * FROM public.users`;
      const result = await this.db.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id_user: number, request: UpdateUserDto): Promise<any> {
    const { name, email } = request;
    const query = `UPDATE public.users SET name = $1, email = $2, update_date = NOW() WHERE id_user = $3 RETURNING *`;
    const values = [name, email, id_user];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async deleteUser(id_user: number): Promise<any> {
    try {
      const query = `DELETE FROM public.users WHERE id_user = $1 RETURNING *`;
      const result = await this.db.query(query, [id_user]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}
