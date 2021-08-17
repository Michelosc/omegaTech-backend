import { Propostas } from 'src/calculadora-de-proposta/models/propostas.model';
import { Column, OneToMany } from 'typeorm';

export class CriarUsuarioDto {
  nome: string;

  email: string;

  password: string;

  propostas: Propostas[];
}
