import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GalleryService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}
  private readonly galleryPath = path.join(process.cwd(), 'uploads/gallery');

  async saveGalleryImage(image_url: string, description: string): Promise<any> {
    const query = `INSERT INTO public.images (image_url, description, ts_insert)
                   VALUES ($1, $2, NOW())
                   RETURNING id_image, image_url, description;`;
    const values = [image_url, description];
    const result = await this.pool.query(query, values);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: 'Falha ao salvar a imagem.',
      };
    }
    return {
      success: true,
      message: 'Imagem salva com sucesso!',
      data: result.rows[0],
    };
  }

  async listGalleryImages(): Promise<string[]> {
    try {
      const files = fs.readdirSync(this.galleryPath);
      return files.map((file) => `/uploads/gallery/${file}`);
    } catch (error) {
      console.error('Erro ao listar imagens da galeria:', error);
      return [];
    }
  }
}
