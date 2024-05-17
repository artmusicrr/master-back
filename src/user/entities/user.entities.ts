import { HttpException, HttpStatus } from '@nestjs/common';
import { Client } from 'pg';
import { DataRequest } from '../../interfaces/request.interface';

import * as bcrypt from 'bcrypt';

export class UserRepository {
  db: Client;
  constructor(db: Client) {
    this.db = db;
  }
  //async findUserLogin(): Promise<any> {
  // try {
  //   const query = `
  //    SELECT id_user, username, email,password,  registration_date, active
  //    FROM public.users
  //    WHERE username = $1;`;
  //   const result = await db.query(query, [username]);
  //   return result.rows[0];
  // } catch (error) {
  //   throw new Error('Erro ao executar a consulta');
  // }
  //}

  async createUser(
    //id_user: number,
    //email: string,
    //password: string,
    //name: string, 
    request: DataRequest): Promise<void> {
  try {
    if (!request.name || !request.email || !request.password) {
      throw new HttpException(
        'Campos obrigatórios não fornecidos',
        HttpStatus.BAD_REQUEST,
      );
    }
    const query = `
      INSERT INTO public.users (name, email, password, registration_date)
      VALUES ($1, $2, $3, NOW());`;
    const values = [ 
      request.name,
      request.email,
      (request.password = bcrypt.hashSync(request.password, 8)),
    ];
    await this.db.query(query, values);
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  }

  //async findByName(): Promise<any> {
  // try {
  //   const query = `
  //    SELECT id_user, username, email, registration_date, active
  //    FROM public.users
  //    WHERE username = $1;`;
  //   const result = await db.query(query, [username]);
  //   return result.rows[0];
  // } catch (error) {
  //   throw new Error('Erro ao executar a consulta');
  // }
  //}

  async findAllUsers(): Promise<any> {
    try {
      const query = `
      select * from public.users;`;
      const dataAccess = await this.db.query(query);
      const res = dataAccess.rows;
      console.log('=====>', res);
      return res;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //async findById(): Promise<any> {
  // try {
  //   const query = `
  //    SELECT id_user, username, email, registration_date, active
  //    FROM public.users
  //    WHERE id_user = $1;`;
  //   const values = [id_user];
  //   const result = await db.query(query, values);
  //   return result.rows[0];
  // } catch (error) {
  //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  // }
  //}

  async updateById(id_user: number, request: DataRequest): Promise<any> {
    const id = id_user;
    //console.log('id ===>', id);
    try {
      if (!id_user) {
        throw new HttpException('id_user inexistente', HttpStatus.BAD_REQUEST);
      }
      const query = `
       UPDATE public.users
       SET name = $1, email = $2
       WHERE id_user = $3
       RETURNING id_user, name, email, update_date,registration_date;`;
      const values = [request.name, request.email, id];
      //console.log('values ===>', values);
      const dataAccess = await this.db.query(query, values);
      const res = dataAccess.rows[0];

      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id_user: number, request: DataRequest): Promise<any> {
    const id = id_user;
    console.log('id ===>', id);
   
      if (!id_user) {
        throw new HttpException('id_user inexistente', HttpStatus.BAD_REQUEST);
      }
      try {
        const query = `SELECT name FROM public.users WHERE id_user = $1;`;
        const data = await this.db.query(query, [id_user]);
        const userToDelete = data.rows[0];
        if (!userToDelete) {
          throw new HttpException(
            `id_user ${id_user} inexistente`,
            HttpStatus.NOT_FOUND,
          );
        }
        const deleteQuery = `DELETE FROM public.users WHERE id_user = $1;`;
        await this.db.query(deleteQuery, [id_user]);
        return {
          message: `Usuário deletado com sucesso`,
          user: userToDelete.username,
        };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }

      //async updateUserPassword() // db: Client,
  // token: string,
  // password: string,
  //: Promise<any> {
    // try {
    //   const queryUpdatePassword = `
    //   UPDATE public.users
    //   SET password = $2
    //   WHERE reset_token = $1;`;
    //   const values = [token, (password = bcrypt.hashSync(password, 8))];
    //   if (!token) {
    //     throw new HttpException(` ${token} inexistente`, HttpStatus.NOT_FOUND);
    //   }
    //   const data = await db.query(queryUpdatePassword, values);
    //   if (data.rowCount === 0) {
    //     throw new HttpException('Token não encontrado', HttpStatus.NOT_FOUND);
    //   }
    //   const queryResetToken = `
    //   UPDATE public.users
    //   SET reset_token = null
    //   WHERE reset_token = $1;`;
    //   const valuesResetToken = [token];
    //   await db.query(queryResetToken, valuesResetToken);
    // } catch (error) {
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
  //}

  // async updateUserPassword(
  //   db: Client,
  //   username: string,
  //   password: string,
  // ): Promise<any> {
  //   try {
  //     const query = `
  //     UPDATE public.users
  //     SET password = $2

  //     WHERE username = $1;`;
  //     const values = [username, password];
  //     await db.query(query, values);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  //async saveResetToken() // userId: string,
  // resetToken: string,
  // expirationDate: Date,
  //: Promise<void> {
    // try {
    //   const query = `
    //     UPDATE public.users
    //     SET reset_token = $1, reset_token_expiration = $2
    //     WHERE id_user = $3;`;
    //   const values = [resetToken, expirationDate, userId];
    //   console.log('====>>', resetToken);
    //   await this.db.query(query, values);
    // } catch (error) {
    //   throw new HttpException(
    //     'Erro ao salvar o token de redefinição',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  //}

  //async findUserByEmail(): Promise<any> {
    //try {
      //   const query = `
      //    SELECT id_user, username, email, registration_date, active
      //    FROM public.users
      //    WHERE email = $1;`;
      //   const result = await db.query(query, [email]);
      //   return result.rows[0];
    //} catch (error) {
      //throw new Error('Erro ao executar a consulta');
    //}
  //}

  //async Updatepassword() // userId: string,
  // resetToken: string,
  // password: string,
  // token_password: string,
  //: Promise<void> {
    //try {
      //   const query = `
      //     UPDATE public.users
      //     SET password = $1,
      //     WHERE id_user = $3 and token_password = $4 and reset_Token = $2;`;
      //   const values = [password, resetToken, userId, token_password];
      //   console.log(',,,,,,', resetToken, token_password);
      //   await this.db.query(query, values);
    //} catch (error) {
    //  throw new HttpException(
    //    'Erro ao salvar o token de redefinição',
    //    HttpStatus.INTERNAL_SERVER_ERROR,
    //  );
    //}
  //}
}

