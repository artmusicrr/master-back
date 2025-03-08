import { Controller, Get, Post, Body, Param, UseGuards, UsePipes, ValidationPipe, Req, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthdGuard } from '../auth/auth-guard/jwt-auth.guard';
import { CreateContactFormDto } from './dto/create-contact-form.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('form')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() contactData: CreateContactFormDto) {
    return await this.contactService.createContact(contactData);
  }

  @UseGuards(JwtAuthdGuard)
  @Get()
  async findAll() {
    return await this.contactService.listContacts();
  }

  @UseGuards(JwtAuthdGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.contactService.getContactById(+id);
  }

  @Post('twilio-webhook')
  async handleTwilioWebhook(@Req() req, @Res() res) {
    const { Body, From } = req.body;

    const contactData = {
      name: 'Desconhecido',
      email: '',
      phone_number: From,
      event_location: 'Não especificado',
      event_date: 'Não especificado',
      event_type: 'Não especificado',
      message: Body,
    };

    await this.contactService.createContact(contactData);

    res.status(200).send('<Response><Message>Mensagem recebida com sucesso!</Message></Response>');
  }

}