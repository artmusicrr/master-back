import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
//import { DataRequest } from 'src/interfaces/request.interface';

//import * as bcrypt from 'bcrypt';
//import { CreateUserDto, UpdateUserDto } from './use.dto';

@Injectable()
export class TitleRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async findAllTitle(): Promise<any> {
    try {
      const query = `SELECT * FROM public.text_title`;
      const result = await this.db.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id_text: number, request: any): Promise<any> {
    console.log('request ==>', request.id_text);
    const { text } = request;
    const query = `UPDATE public.text_title SET text=$1 WHERE id_text = $2 RETURNING *`;
    const values = [text, id_text];
    console.log('VALUES ===>>', values, id_text);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  //   async findByName(name: string): Promise<any> {
  //     try {
  //       const query = `
  //       SELECT * FROM public.users where name = '${name}';`;
  //       const result = await this.db.query(query);
  //       return result.rows[0];
  //     } catch (error) {
  //       throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //     }
  //   }
}
