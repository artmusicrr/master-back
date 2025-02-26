import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DataRequest } from 'src/interfaces/request.interface';

@Injectable()
export class TitleRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async findAllTitle(): Promise<any> {
    try {
      const query = `SELECT * FROM public.adm_slider`;
      const result = await this.db.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async updateByIdText(id: number, request: DataRequest): Promise<any> {
    console.log('request entities ==>', request.id_text);
    const {
      text,
      font_size_text,
      color_text,
      font_weight_text,
      font_family_text,
    } = request;
    const query = `UPDATE public.adm_slider SET 
	                    text = $1, 
	                    font_size_text = $3, 
	                    color_text =$4, 
	                    font_weight_text = $5, 
	                    font_family_text = $6   
	                 WHERE id = $2 
	                 RETURNING *;`;
    const values = [
      text,
      id,
      font_size_text,
      color_text,
      font_weight_text,
      font_family_text,
    ];
    console.log('VALUES ===>>', values);
    const result = await this.db.query(query, values);
    console.log('result ENTITY ===>>', result.rows[0]);
    return result.rows[0];
  }

  async updateByIdTitle(id: number, request: DataRequest): Promise<any> {
    const {
      title,
      font_size_title,
      color_title,
      font_weight_title,
      font_family_title,
    } = request;
    const query = `UPDATE public.adm_slider 
	                    SET title = $2, 
		                  font_size_title = $3, 
		                  color_title = $4, 
		                  font_weight_title = $5, 
		                  font_family_title = $6 
	                 WHERE id = $1 
	                 RETURNING *;`;
    const values = [
      id,
      title,
      font_size_title,
      color_title,
      font_weight_title,
      font_family_title,
    ];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async updateByIdSubTitle(id: number, request: DataRequest): Promise<any> {
    const {
      sub_title,
      font_size_sub_title,
      color_sub_title,
      font_weight_sub_title,
      font_family_sub_title,
    } = request;
    const query = `UPDATE public.adm_slider SET 
	                    sub_title = $1 , 
	                    font_size_sub_title = $3, 
	                    font_weight_sub_title = $5, 
	                    font_family_sub_title = $6, 
	                    color_sub_title = $4  
	                 WHERE id = $2 
	                 RETURNING *;`;
    const values = [
      sub_title,
      id,
      font_size_sub_title,
      color_sub_title,
      font_weight_sub_title,
      font_family_sub_title,
    ];
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async updateByIdAnyText(id: number, request: DataRequest): Promise<any> {
    // console.log('request ==>', request.id_text);
    const { text } = request;
    const query = `UPDATE public.adm_slider SET any_text = $1 WHERE id = $2 RETURNING *;`;
    const values = [text, id];
    // console.log('VALUES ===>>', values, id_text);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async updateByIdColorText(id: number, request: DataRequest): Promise<any> {
    console.log('request entities ==>', request);
    const { color, typeText } = request;
    const typeNew = typeText;
    const query = `UPDATE public.adm_slider SET ${typeNew} = $1 WHERE id = $2 RETURNING *;`;
    const values = [color, id];
    console.log('VALUES ===>>', values);
    const result = await this.db.query(query, values);
    return result.rows[0];
  }
}
