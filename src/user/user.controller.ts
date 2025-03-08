import {
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

  @Post('/create-user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() request: CreateUserDto): Promise<any> {
    console.log('[UserController] Create user request received:', { email: request.email });
    const data = await this.userService.createUser(request);
    console.log('[UserController] User created successfully');
    return {
      message: 'Usuário criado com sucesso',
      data: data,
    };
  }

  @Get()
  async findAllUsers() {
    console.log('[UserController] Get all users request received');
    try {
      const users = await this.userService.findAllUsers();
      console.log('[UserController] Retrieved', users.length, 'users');
      return users;
    } catch (error) {
      console.error('[UserController] Error fetching users:', error.message);
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
    console.log('[UserController] Update user request received:', { id_user, ...updateUserDto });
    try {
      const updatedUser = await this.userService.updateUser(id_user, updateUserDto);
      console.log('[UserController] User updated successfully:', id_user);
      return { message: 'Usuário atualizado com sucesso', user: updatedUser };
    } catch (error) {
      console.error('[UserController] Error updating user:', error.message);
      throw new NotFoundException(error.message);
    }
  }

  @UseGuards(JwtAuthdGuard)
  @Delete(':id_user')
  async deleteUser(@Param('id_user') id_user: number): Promise<any> {
    console.log('[UserController] Delete user request received:', id_user);
    try {
      const deletedUser = await this.userService.DeleteUser(id_user);
      console.log('[UserController] User deleted successfully:', id_user);
      return {
        message: `User ${deletedUser.name} deleted successfully`,
        user: deletedUser,
      };
    } catch (error) {
      console.error('[UserController] Error deleting user:', error.message);
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
    console.log('[UserController] Update password request received');
    try {
      const { reset_token, password } = request;
      await this.userService.updateUserPassword(reset_token, password);
      console.log('[UserController] Password updated successfully');
      return { message: 'Password updated successfully' };
    } catch (error) {
      console.error('[UserController] Error updating password:', error.message);
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
}
