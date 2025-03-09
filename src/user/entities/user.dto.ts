import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  password: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  @IsBoolean()
  flag_active?: boolean = true;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  password?: string;
}

export class ResetPasswordDto {
  email: string;
}

export class ConfirmResetPasswordDto {
  token: string;
  password: string;
}
