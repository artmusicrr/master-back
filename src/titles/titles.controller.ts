import {
  //UseGuards,
  Controller,
  Get,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { TitlesService } from './titles.service';
//import { JwtAuthdGuard } from 'src/auth/auth-guard/jwt-auth.guard';
import { DataRequest } from 'src/interfaces/request.interface';

@Controller('title')
export class TitleController {
  constructor(private readonly titlesService: TitlesService) {}

  // @UseGuards(JwtAuthdGuard)
  //@UseGuards(JwtAuthdGuard)
  @Get()
  async findAllUsers() {
    const user = await this.titlesService.findAllUsers();
    return user;
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-text/:id_text')
  async updateText(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const text = await this.titlesService.updateText(id_text, request);
    return {
      message: 'Texto atualizado com sucesso!',
      text: text,
    };
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-title/:id_text')
  async updateTitle(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const title = await this.titlesService.updateTitle(id_text, request);
    console.log('controller ==>', title, request.color_title);
    return { message: 'Título atualizado com sucesso', title: title };
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-sub-title/:id_text')
  async updateSubTitle(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const sub_title = await this.titlesService.updateSubTitle(id_text, request);
    return {
      message: 'Sub Título atualizado com sucesso',
      sub_title: sub_title,
    };
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-any-text/:id_text')
  async updateAnyText(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const any_text = await this.titlesService.updateAnyText(id_text, request);
    return {
      message: 'Sub Título atualizado com sucesso',
      any_text: any_text,
    };
  }

  @Patch('/update-color/:id_text')
  async updateColorText(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    console.log('request >=>=>', request);
    const colorText = await this.titlesService.updateColorText(
      id_text,
      request,
    );
    return {
      message: 'Cor atualizada com sucesso',
      color_title: colorText,
    };
  }
}
