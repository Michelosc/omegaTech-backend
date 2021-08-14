import { Guid } from 'guid-typescript';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Propostas } from './propostas.model';

@Entity({ name: 'TB_USUARIOS' })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  public id: number;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  public idPublico: Guid;

  @Column({ type: 'varchar', name: 'NOME' })
  public nome: string;

  @Column({ type: 'varchar', name: 'EMAIL' })
  public email: string;

  @Column({ type: 'varchar', name: 'SENHA' })
  public senha: string;

  @OneToMany((type) => Propostas, (propostas) => propostas.usuario)
  public propostas: Propostas[];
}
