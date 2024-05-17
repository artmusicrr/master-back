import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  //UseGuards,
} from '@nestjs/common';
import { DataRequest } from '../../src/interfaces/request.interface';
import { UserService } from './user.service';
import { request } from 'http';
//import { request } from 'http';
//import { JwtAuthdGuard } from 'src/auth/auth-guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  async createUser(@Body() request: DataRequest): Promise<any> {
    try {
      const data = await this.userService.CreateUser(request);
      return {
        message: 'Usuário criado com sucesso',
        data: data,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @UseGuards(JwtAuthdGuard)
  // @Get('username/:username')
  // async findByName(@Param('username') username: string): Promise<any> {
  //   try {
  //     const data = await this.usersService.getByUserName(username);
  //     if (!data) {
  //       throw new HttpException('Usuário não localizado', HttpStatus.NOT_FOUND);
  //     }
  //     return data;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  //@UseGuards(JwtAuthdGuard)
  @Get()
  async findAll() {
    try {
      const user = await this.userService.findUser();
      console.log('controller =====>', user);
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @UseGuards(JwtAuthdGuard)
  // @Get(':id')
  // async findById(@Param('id') id_user: string): Promise<any> {
  //   try {
  //     const data = await this.usersService.getUserById(id_user);
  //     if (!data) {
  //       throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //     }
  //     return data;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @UseGuards(JwtAuthdGuard)
  @Patch(':id_user')
  async updateById(
    @Param('id_user') id_user: number,
    @Body()
    request: DataRequest,
  ): Promise<any> {
    try {
      console.log('controller =====>', id_user);
      const updatedUser = await this.userService.UpdateUser(id_user, request);
      if (!updatedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return {
        message: `Usuário ${updatedUser.name} atualizado com sucesso`,
        user: updatedUser.name,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //@UseGuards(JwtAuthdGuard)
  @Delete(':id_user')
  async deleteUser(@Param('id_user') id_user: number,  @Body()
  request: DataRequest,): Promise<any> {
    try {
      const deletedUser = await this.userService.DeleteUser(id_user, request);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: `Usuário deletado com sucesso`,
        user: deletedUser.name,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // @Post('/update-password')
  // async updateUserPassword(
  //   @Body() request: { token: string; password: string },
  // ): Promise<any> {
  //   try {
  //     const { token, password } = request;
  //     await this.usersService.updateUserPassword(token, password);

  //     return { message: 'Password updated successfully' };
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error; // rethrow the HttpException with detailed error message
  //     } else {
  //       throw new HttpException(
  //         'Erro ao atualizar a senha',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  // }

  // @Post('/reset-password')
  // async handleResetPassword(email: string) {
  //   try {
  //     // const decoded = jwt.verify(
  //     //   query.token,
  //     //   process.env.JWT_SECRET,
  //     // ) as DecodedToken;
  //     // const { email, resetToken } = decoded;

  //     const user = await this.usersService.findUserByEmail(email);
  //     // Aqui você pode implementar a lógica para permitir que o usuário redefina a senha
  //     if (!user.resetToken) {
  //       return {
  //         message: `Tokem inválido!!!`,
  //         reset_token: user.resetToken,
  //       };
  //       // Permita que o usuário redefina a senha
  //       // Pode ser uma página ou uma lógica para alterar a senha no banco de dados
  //     } else {
  //       throw new Error('Token de redefinição de senha inválido');
  //     }
  //   } catch (error) {
  //     console.error('Erro ao verificar o token:', error);
  //     throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
  //   }
  // }
}
