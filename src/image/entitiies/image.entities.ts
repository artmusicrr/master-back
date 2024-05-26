import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DataRequest } from 'src/interfaces/request.interface';


@Injectable()
export class ImageRepository {
  constructor(@Inject('PG_POOL') private readonly db: Pool) {}

  async findAllImages(): Promise<any> {
    try {
      const query = `SELECT * FROM public.images`;
      const result = await this.db.query(query);
      return result.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async imageExists(img_home: string): Promise<boolean> {
    const query = `SELECT 1 FROM public.images WHERE img_home = $1 LIMIT 1`;
    const imgHomeBuffer = Buffer.from(img_home, 'base64');
    const result = await this.db.query(query, [imgHomeBuffer]);
    return result.rowCount > 0;
  }

  async createImage(request: DataRequest): Promise<void> {
    try {
      const { img_home } = request;
      const imgHomeBuffer = Buffer.from(img_home, 'base64');
      const query = `INSERT INTO public.images (img_home) VALUES ($1) RETURNING *`;
      const result = await this.db.query(query, [imgHomeBuffer]);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    }
  }


}
