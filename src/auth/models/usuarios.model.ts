import { Exclude } from 'class-transformer';
import { Guid } from 'guid-typescript';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Propostas } from '../../calculadora-de-proposta/models/propostas.model';

@Entity({ name: 'TB_USUARIOS' })
export class Usuarios {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  public id: string;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  public idPublico: string;

  @Column({ type: 'varchar', name: 'NOME' })
  public nome: string;

  @Column({ type: 'varchar', name: 'EMAIL' })
  public email: string;

  @Column({ type: 'varchar', name: 'SENHA' })
  public senha: string;

  @OneToMany((type) => Propostas, (propostas) => propostas.usuario, {
    eager: true,
  })
  public propostas: Propostas[];

  constructor(nome: string, email: string, senha: string) {
    this.idPublico = Guid.create().toString();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}
