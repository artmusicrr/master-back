import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';


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

  async updateByIdText(id_text: number, request: any): Promise<any> {
    //console.log('request entities ==>', request.id_text);
    const { content } = request;
    const query = `UPDATE public.text_title SET text = $1 WHERE id_text = $2 RETURNING *;`;
    const values = [content, id_text];
    //console.log('VALUES ===>>', values, id_text);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async updateByIdTitle(id_text: number, request: any): Promise<any> {
    //console.log('request ==>', request.id_text);
    const { content } = request;
    const query = `UPDATE public.text_title SET title =$1 WHERE id_text = $2 RETURNING *;`;
    const values = [content, id_text];
    //console.log('VALUES ===>>', values, id_text);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async updateByIdSubTitle(id_text: number, request: any): Promise<any> {
    //console.log('request ==>', request.id_text);
    const { content } = request;
    const query = `UPDATE public.text_title SET sub_title = $1 WHERE id_text = $2 RETURNING *;`;
    const values = [content, id_text];
    //console.log('VALUES ===>>', values, id_text);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async updateByIdAnyText(id_text: number, request: any): Promise<any> {
    // console.log('request ==>', request.id_text);
    const { content } = request;
    const query = `UPDATE public.text_title SET any_text = $1 WHERE id_text = $2 RETURNING *;`;
    const values = [content, id_text];
    // console.log('VALUES ===>>', values, id_text);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }
}
