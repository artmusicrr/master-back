import {
  NotFoundException,
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
    try {
      const user = await this.titlesService.findAllUsers();
      return user;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-text/:id_text')
  async updateText(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    try {
      const text = await this.titlesService.updateText(id_text, request);
      //console.log('controller ==>', request.id_text, text);
      return { message: 'Texto atualizado com sucesso !!!!! NO DB', text: text };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-title/:id_text')
  async updateTitle(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    //console.log('request ==>', request.color);
    try {
      const title = await this.titlesService.updateTitle(id_text, request);
      console.log('controller ==>', title,  request.color_title);
      return { message: 'Título atualizado com sucesso', title: title };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-sub-title/:id_text')
  async updateSubTitle(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    try {
      const sub_title = await this.titlesService.updateSubTitle(
        id_text,
        request,
      );
      //console.log('controller ==>', sub_title);
      return {
        message: 'Sub Título atualizado com sucesso',
        sub_title: sub_title,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-any-text/:id_text')
  async updateAnyText(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    try {
      const any_text = await this.titlesService.updateAnyText(id_text, request);
      //console.log('controller ==>', any_text);
      return {
        message: 'Sub Título atualizado com sucesso',
        any_text: any_text,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Patch('/update-color/:id_text')
  async updateColorText(
    @Param('id_text') id_text: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    console.log('request >=>=>', request);
    try {
      const colorText = await this.titlesService.updateColorText(id_text, request);
      console.log('colorText ==>', colorText.color_title);
      return {
        message: 'Cor atualizada com sucesso',
        color_title: colorText,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
