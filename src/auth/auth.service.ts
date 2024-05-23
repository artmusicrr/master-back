//import { name } from './../../node_modules/ci-info/index.d';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByUsername(name);
      if (user && bcrypt.compareSync(password, user.password)) {
        const { id_user, name, email } = user;
        return { id_user, name, email };
      }
      if (!user) {
        throw new BadRequestException('Invalid Credentials');
      }
    } catch (error) {
      throw new BadRequestException('Invalid Credentials');
    }

    return null;
  }

  async login(user: any) {
    try {
      const payload = {
        name: user.name,
        sub: user.id_user,
        email_user: user.email,
      };

      console.log(payload);
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new BadRequestException('Invalid Credentials');
    }
  }
  async getByLogin(name: string): Promise<any> {
    try {
      const data = await this.usersService.getByLogin(name);
      if (!data) {
        throw new Error('Usuário não localizado');
      }
      return data;
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
  async saveByResetToken(
    id_user: string,
    reset_token: string,
    expirationDate: Date,
  ): Promise<void> {
    try {
      await this.usersService.saveByResetToken(
        id_user,
        reset_token,
        expirationDate,
      );
    } catch (error) {
      throw new HttpException(
        'Erro ao salvar o token de redefinição',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async sendPasswordResetEmail(
    email: string,
    reset_Token: string,
  ): Promise<void> {
    const resetLink = `http://your-website.com/reset-password?token=${reset_Token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: process.env.EMAIL_USER, // Seu endereço de e-mail
        pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: 'artmusicrod@gmail.com',
      to: email,
      subject: 'Redefinição de senha',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Redefinição de Senha</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo para redefinir sua senha:</p>
        <h3 style="font-family: Arial, sans-serif; line-height: 1.4;">Utilize seu Token para redefinir sua senha:  <strong>${reset_Token}</strong></h3>
       
        <p>
          <a href="${resetLink}" style="color: #1a73e8; text-decoration: none;">
            Redefinir Senha
          </a>
        </p>
        <p>Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
        <p>Obrigado,</p>
        <p>Equipe de Suporte</p>
      </div>
    `,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      console.log(mailOptions);
    }
  }
}
