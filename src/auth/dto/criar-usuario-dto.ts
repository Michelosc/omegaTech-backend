import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Propostas } from 'src/calculadora-de-proposta/models/propostas.model';
import { Column, OneToMany } from 'typeorm';

export class CriarUsuarioDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome para criação de usuário',
    type: () => String,
  })
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email para criação de usuário',
    type: () => String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({ description: 'Senha do usuário', type: () => String })
  senha: string;
}
