import {
  NotFoundException,
  UseGuards,
  Controller,
  Get,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { TitlesService } from './titles.service';
import { JwtAuthdGuard } from 'src/auth/auth-guard/jwt-auth.guard';
import { DataRequest } from 'src/interfaces/request.interface';

@Controller('title')
export class TitleController {
  constructor(private readonly titlesService: TitlesService) {}

  // @UseGuards(JwtAuthdGuard)

  @UseGuards(JwtAuthdGuard)
  @Get()
  async findAllUsers() {
    try {
      const user = await this.titlesService.findAllUsers();
      return user;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthdGuard)
  @Patch(':id_text')
  async updateTitle(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    try {
      const title = await this.titlesService.updateTitle(id_text, request);
      console.log('controller ==>', title);
      return { message: 'Usuário atualizado com sucesso', title: title };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
