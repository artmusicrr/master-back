import {
  Controller,
  UseGuards,
  Request,
  Post,
  HttpException,
  HttpStatus,
  Body,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './local.auth/local-auth.guard';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './../user/entities/user.dto';
import * as crypto from 'crypto';
import { AuthGuard } from '@nestjs/passport';

function generateResetToken(
  tokenLength: number,
  expirationMinutes: number,
): { reset_token: string; expiration: Date } {
  const reset_token = crypto
    .randomBytes(tokenLength)
    .toString('hex')
    .toUpperCase();
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + expirationMinutes * 60 * 1000);
  return { reset_token, expiration };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('/recover-password')
  async recoverPassword(@Body() request: UpdateUserDto): Promise<any> {
    try {
      const user = await this.authService.getByLogin(request.name);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      const { reset_token, expiration } = generateResetToken(4, 1);
      await this.authService.saveByResetToken(
        user.id_user,
        reset_token,
        expiration,
      );
      await this.authService.sendPasswordResetEmail(user.email, reset_token);
      return {
        message: `Instruções de redefinição de senha enviadas com sucesso para   ${user.email}`,
      };
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Initiates Google OAuth2 login
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req) {
    // After successful authentication, generate JWT
    return this.authService.login(req.user);
  }
}
