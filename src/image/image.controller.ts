import {
    NotFoundException,
    //UseGuards,
    Controller,
    Get,
    Body,
    Post,
    Param,
    Patch,
    BadRequestException,
  } from '@nestjs/common';
  import { ImageService } from './image.service';
  //import { JwtAuthdGuard } from 'src/auth/auth-guard/jwt-auth.guard';
  import { DataRequest } from 'src/interfaces/request.interface';
  
  @Controller('image')
  export class ImageController {
    constructor(private readonly imageService: ImageService) {}
  
    // @UseGuards(JwtAuthdGuard)
  
    //@UseGuards(JwtAuthdGuard)
    @Get()
    async findAllImages() {
      try {
        const user = await this.imageService.findAllImages();
        return user;
      } catch (error) {
        console.log(error);
        throw new NotFoundException(error.message);
      }
    }

    @Post('/create-img')
    async createUser(@Body() request: DataRequest): Promise<any> {
      try {
        const data = await this.imageService.createImage(request);
        return {
          message: 'Imagem criada com sucesso',
          data: data,
        };
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new BadRequestException(error.message);
      }
    }
  
    
  }
  