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
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './entities/user.dto';
import { UserService } from './user.service';
import { JwtAuthdGuard } from 'src/auth/auth-guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthdGuard)
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

  @Delete(':id_user')
  async deleteUser(@Param('id_user') id_user: number): Promise<any> {
    try {
      const deletedUser = await this.userService.DeleteUser(id_user);
      return {
        message: `User ${deletedUser.name} deleted successfully`,
        //user: deletedUser,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
