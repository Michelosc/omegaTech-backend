import { Propostas } from 'src/calculadora-de-proposta/models/propostas.model';
import { Column, OneToMany } from 'typeorm';

export class CriarUsuarioDto {
  @Column({ type: 'varchar', name: 'NOME_USUARIO' })
  nome: string;
  @Column({ unique: true, name: 'EMAIL_USUARIO' })
  email: string;
  @Column({ name: 'SENHA_USUARIO' })
  password: string;
  @OneToMany((type) => Propostas, (propostas) => propostas.usuario, {
    eager: true,
  })
  propostas: Propostas[];
}
