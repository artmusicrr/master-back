import {
  BadRequestException,
  NotFoundException,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';
import { UserService } from './user.service';
import { JwtAuthdGuard } from 'src/auth/auth-guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthdGuard)
  @Post('/create-user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() request: CreateUserDto): Promise<any> {
    try {
      const data = await this.userService.createUser(request);
      return {
        message: 'Usuário criado com sucesso',
        data: data,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
  @UseGuards(JwtAuthdGuard)
  @Get()
  async findAllUsers() {
    try {
      const user = await this.userService.findAllUsers();
      return user;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthdGuard)
  @Patch(':id_user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateUser(
    @Param('id_user') id_user: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      const updatedUser = await this.userService.updateUser(
        id_user,
        updateUserDto,
      );
      return { message: 'Usuário atualizado com sucesso', user: updatedUser };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthdGuard)
  @Delete(':id_user')
  async deleteUser(@Param('id_user') id_user: number): Promise<any> {
    try {
      const deletedUser = await this.userService.DeleteUser(id_user);
      return {
        message: `User ${deletedUser.name} deleted successfully`,
        user: deletedUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('/update-password')
  async updateUserPassword(
    @Body()
    request: {
      reset_token: string;
      password: string;
    },
  ): Promise<any> {
    try {
      const { reset_token, password } = request;
      await this.userService.updateUserPassword(reset_token, password);

      return { message: 'Password updated successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Erro ao atualizar a senha',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  // }
}
