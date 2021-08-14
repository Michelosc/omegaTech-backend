import { Guid } from 'guid-typescript';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Propostas } from './propostas.model';

@Entity({ name: 'TB_USUARIOS' })
export class Usuarios {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  idPublico: Guid;

  @Column({ type: 'varchar', name: 'NOME' })
  nome: string;

  @Column({ type: 'varchar', name: 'EMAIL' })
  email: string;

  @Column({ type: 'varchar', name: 'SENHA' })
  senha: string;

  @OneToMany((type) => Propostas, (propostas) => propostas.usuario)
  propostas: Propostas;
}
