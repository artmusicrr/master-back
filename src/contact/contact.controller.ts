import { Controller, Get, Post, Body, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
}