import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Email do usuário', type: () => String })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: 'Senha do usuário', type: () => String })
  senha: string;
}
