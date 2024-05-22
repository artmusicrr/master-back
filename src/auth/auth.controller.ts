import {
  Controller,
  UseGuards,
  Request,
  Post,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.auth/local-auth.guard';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './../user/entities/user.dto';
import * as crypto from 'crypto';

function generateResetToken(
  tokenLength: number,
  expirationMinutes: number,
): { reset_token: string; expiration: Date } {
  const reset_token = crypto
    .randomBytes(tokenLength)
    .toString('hex')
    .toUpperCase(); // Gera uma string hexadecimal aleatória
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + expirationMinutes * 60 * 1000); // Define o tempo de expiração em minutos
  return { reset_token, expiration };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('/recover-password')
  async recoverPassword(@Body() request: UpdateUserDto): Promise<any> {
    try {
      const user = await this.authService.getByLogin(request.name);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      console.log('=user=', user);
      const { reset_token, expiration } = generateResetToken(4, 1); // Gera um token de redefinição de senha único com expiração de 30 minutos
      await this.authService.saveByResetToken(
        user.id_user,
        reset_token,
        expiration,
      ); // Salva o token de redefinição no banco de dados, associado ao usuário
      await this.authService.sendPasswordResetEmail(user.email, reset_token); // Envie o token de redefinição de senha por e-mail
      return {
        message: `Instruções de redefinição de senha enviadas com sucesso para   ${user.email}`,
      };
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
