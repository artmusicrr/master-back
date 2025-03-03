import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import * as twilio from 'twilio';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  private twilioClient: Twilio | null = null;
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @Inject('PG_POOL') private readonly pool: Pool,
    private readonly configService: ConfigService,
  ) {
    this.initTwilioClient();
  }

  private initTwilioClient() {
    try {
      const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID') || 'AC98c1db3f38b6e5595edc3f46a50d0ab4';
      const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

      if (!authToken) {
        this.logger.error('❌ TWILIO_AUTH_TOKEN is not set in environment variables');
        return;
      }

      this.logger.debug('Initializing Twilio client with:', { 
        accountSid, 
        authTokenPresent: !!authToken,
        authTokenLength: authToken?.length 
      });

      this.twilioClient = twilio(accountSid, authToken);
      this.logger.log('✅ Twilio client initialized successfully');
    } catch (error) {
      this.logger.error('❌ Failed to initialize Twilio client:', error);
    }
  }

  private formatPhoneNumberForWhatsApp(phoneNumber: string): string {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return cleaned.startsWith('55') ? cleaned : `55${cleaned}`;
  }

  private async sendWhatsAppNotification(contactData: {
    name: string;
    email: string;
    phone_number?: string;
    event_location: string;
    event_date: string;
    event_type: string;
    message: string;
  }) {
    if (!this.twilioClient) {
      this.logger.warn('⚠️ Twilio client not initialized. Skipping WhatsApp notification.');
      return;
    }

    try {
      const from = 'whatsapp:+14155238886'; // Twilio's default sandbox number
      const to = 'whatsapp:+' + this.formatPhoneNumberForWhatsApp(contactData.phone_number || '');

      this.logger.log('📨 Sending WhatsApp message...', {
        from,
        to,
        data: contactData
      });

      const message = await this.twilioClient.messages.create({
        from,
        to,
        body: `📨 *Novo contato:*

👤 *Nome:* ${contactData.name}
📧 *E-mail:* ${contactData.email}
📱 *Telefone:* ${contactData.phone_number}
📍 *Local do Evento:* ${contactData.event_location}
📅 *Data do Evento:* ${contactData.event_date}
🎯 *Tipo de Evento:* ${contactData.event_type}

💬 *Mensagem:*
${contactData.message}`
      });

      this.logger.log(`✅ WhatsApp message sent successfully! SID: ${message.sid}`);
      return message;
    } catch (error) {
      this.logger.error('❌ Failed to send WhatsApp notification:', error);
      if (error.code === 20003) {
        this.logger.error('Authentication failed. Please check your Twilio credentials.');
      }
      // Log but don't throw, so form submission can continue
      return null;
    }
  }

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

    const values = [
      contactData.name,
      contactData.email,
      contactData.phone_number,
      contactData.event_location,
      contactData.event_date,
      contactData.event_type,
      contactData.message
    ];

    try {
      const result = await this.pool.query(query, values);
      
      // Enviar notificação WhatsApp após salvar no banco
      await this.sendWhatsAppNotification(contactData);
      
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