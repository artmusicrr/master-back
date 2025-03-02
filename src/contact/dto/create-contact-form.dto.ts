import { IsString, IsEmail, IsOptional, IsDateString, IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateContactFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^(?:\d{2}\s?)?\d{4,5}[-\s]?\d{4}$/, {
    message: 'O telefone deve estar em um formato válido: XX XXXXX-XXXX ou XX XXXX-XXXX',
  })
  phone_number?: string;

  @IsString()
  @IsNotEmpty()
  event_location: string;

  @Transform(({ value }) => {
    if (!value) return value;
    // Verifica se já está no formato ISO
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    // Converte de DD/MM/YYYY para YYYY-MM-DD
    const [day, month, year] = value.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  })
  @IsDateString({}, { 
    message: 'A data deve estar no formato DD/MM/YYYY ou YYYY-MM-DD' 
  })
  @IsNotEmpty()
  event_date: string;

  @IsString()
  @IsNotEmpty()
  event_type: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}