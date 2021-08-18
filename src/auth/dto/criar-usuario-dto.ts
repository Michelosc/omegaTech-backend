import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Propostas } from 'src/calculadora-de-proposta/models/propostas.model';
import { Column, OneToMany } from 'typeorm';

export class CriarUsuarioDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  senha: string;
}
