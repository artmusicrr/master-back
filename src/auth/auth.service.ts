import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    name: string,
    password: string,
    //email: string,
  ): Promise<any> {
    try {
      const user = await this.usersService.getUserByUsername(name);
      if (user && bcrypt.compareSync(password, user.password)) {
        const { id_user, name, email } = user;
        console.log(name, user);
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
  //test

  async login(user: any) {
    try {
      const payload = {
        name: user.name,
        sub: user.id_user,
        email_user: user.email,
      };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new BadRequestException('Invalid Credentials');
    }
  }
}
