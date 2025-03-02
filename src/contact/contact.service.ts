import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ContactService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async createContact(contactData: {
    name: string;
    email: string;
    phone_number?: string;
    event_location: string;
    event_date: string;
    event_type: string;
    message: string;
  }): Promise<any> {
    const query = `
      INSERT INTO public.contact_form 
      (name, email, phone_number, event_location, event_date, event_type, message, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id, name, email, created_at;
    `;

    console.log('contactData:', contactData);

    const values = [
      contactData.name,
      contactData.email,
      contactData.phone_number,
      contactData.event_location,
      contactData.event_date,
      contactData.event_type,
      contactData.message
    ];

    console.log('values:', values);

    try {
      const result = await this.pool.query(query, values);
      console.log('result:', result);
      
      return {
        success: true,
        message: 'Formulário de contato enviado com sucesso!',
        data: result.rows[0]
      };
    } catch (error) {
      console.error('Erro ao salvar formulário de contato:', error);
      return {
        success: false,
        message: 'Falha ao enviar formulário de contato.',
        error: error.message
      };
    }
  }

  async listContacts(): Promise<any> {
    try {
      const query = `
        SELECT id, name, email, phone_number, event_location, 
               event_date, event_type, message, created_at
        FROM public.contact_form
        ORDER BY created_at DESC;
      `;
      
      const result = await this.pool.query(query);
      
      return {
        success: true,
        data: result.rows
      };
    } catch (error) {
      console.error('Erro ao listar formulários de contato:', error);
      return {
        success: false,
        message: 'Falha ao recuperar formulários de contato.',
        error: error.message
      };
    }
  }

  async getContactById(id: number): Promise<any> {
    try {
      const query = `
        SELECT id, name, email, phone_number, event_location, 
               event_date, event_type, message, created_at
        FROM public.contact_form
        WHERE id = $1;
      `;
      
      const result = await this.pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return {
          success: false,
          message: 'Formulário de contato não encontrado.'
        };
      }
      
      return {
        success: true,
        data: result.rows[0]
      };
    } catch (error) {
      console.error('Erro ao buscar formulário de contato:', error);
      return {
        success: false,
        message: 'Falha ao recuperar formulário de contato.',
        error: error.message
      };
    }
  }
}