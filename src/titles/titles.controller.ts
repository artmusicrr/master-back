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
  @Patch('/update-text/:id')
  async updateText(
    @Param('id') id: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    console.log('request >=>=>', request, id);
    const result = await this.titlesService.updateText(id, request);
    console.log('result >=>=>', result);
    return {
      message: 'Texto atualizado com sucesso!',
      result: result,
    };
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-title/:id')
  async updateTitle(
    @Param('id') id: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const title = await this.titlesService.updateTitle(id, request);
    return { message: 'Título atualizado com sucesso', title: title };
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-sub-title/:id')
  async updateSubTitle(
    @Param('id') id: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const result = await this.titlesService.updateSubTitle(id, request);
    return {
      message: 'Sub Título atualizado com sucesso',
      sub_title: result,
    };
  }

  //@UseGuards(JwtAuthdGuard)
  @Patch('/update-any-text/:id')
  async updateAnyText(
    @Param('id') id: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    const any_text = await this.titlesService.updateAnyText(id, request);
    return {
      message: 'Sub Título atualizado com sucesso',
      any_text: any_text,
    };
  }

  @Patch('/update-color/:id')
  async updateColorText(
    @Param('id') id: number,
    @Body() request: DataRequest,
  ): Promise<any> {
    console.log('request >=>=>', request);
    const colorText = await this.titlesService.updateColorText(id, request);
    return {
      message: 'Cor atualizada com sucesso',
      color_title: colorText,
    };
  }
}
