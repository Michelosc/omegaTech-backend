import { Exclude } from 'class-transformer';
import { Guid } from 'guid-typescript';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Propostas } from './propostas.model';

@Entity({ name: 'TB_CARGAS' })
export class Cargas {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  public id: string;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  public idPublico: string;

  @Column({ type: 'varchar', name: 'NOME_EMPRESA' })
  public nomeDaEmpresa: string;

  @Column({ type: 'numeric', name: 'CONSUMO' })
  public consumoKwh: number;

  @ManyToMany((type) => Propostas, (propostas) => propostas.cargas, {
    cascade: true,
  })
  propostas: Propostas[];

  constructor(nomeDaEmpresa: string, consumoKwh: number) {
    this.idPublico = Guid.create().toString();
    this.nomeDaEmpresa = nomeDaEmpresa;
    this.consumoKwh = consumoKwh;
  }
}
