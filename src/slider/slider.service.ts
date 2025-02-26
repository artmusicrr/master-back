// slider.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class SliderService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async updateImage(id: number, image_url: string): Promise<any> {
    const query = `UPDATE public.adm_slider 
                   SET image_url = $1 
                   WHERE id = $2 
                   RETURNING *;`;
    const values = [image_url, id];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async findAllSlides(): Promise<any> {
    const query = `SELECT 
	                    id, 
	                    text, 
	                    title, 
	                    sub_title, 
	                    any_text, 
	                    color_title, 
	                    color_text, 
	                    color_sub_title, 
	                    color_any_text, 
	                    font_size_title, 
	                    font_size_sub_title, 
	                    font_size_text, 
	                    font_family_title, 
	                    font_family_sub_title, 
	                    font_family_text, 
	                    font_weight_title, 
	                    font_weight_sub_title, 
	                    font_weight_text,
	                    image_url 
                   FROM public.adm_slider order by id;
`;
    const result = await this.pool.query(query);
    return result.rows;
  }

  // ... outros métodos (create, findAll, etc.) conforme sua necessidade
}
