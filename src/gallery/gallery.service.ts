import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteGalleryImage(filename: string): Promise<any> {
    try {
      // Construir caminho completo do arquivo
      const filePath = path.join(this.galleryPath, filename);
      
      // Verificar se o arquivo existe
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException(`Imagem ${filename} não encontrada`);
      }
      
      // Deletar o arquivo fisicamente
      fs.unlinkSync(filePath);
      
      // Deletar do banco de dados
      const image_url = `/uploads/gallery/${filename}`;
      const query = `DELETE FROM public.images WHERE image_url = $1 RETURNING id_image`;
      const result = await this.pool.query(query, [image_url]);
      
      // Verificar se houve registro deletado no banco
      if (result.rowCount === 0) {
        return {
          success: true,
          message: 'Arquivo físico removido, mas nenhum registro correspondente encontrado no banco de dados.',
        };
      }
      
      return {
        success: true,
        message: 'Imagem removida com sucesso!',
        deletedId: result.rows[0].id_image
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      console.error('Erro ao deletar imagem da galeria:', error);
      return {
        success: false,
        message: 'Falha ao deletar a imagem.',
        error: error.message
      };
    }
  }
}
