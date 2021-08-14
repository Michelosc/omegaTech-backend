import { Guid } from 'guid-typescript';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Propostas } from './propostas.model';

@Entity({ name: 'CARGAS' })
export class Cargas {
  @PrimaryColumn({ type: 'uuid', name: 'ID' })
  id: Guid;

  @Column({ type: 'varchar', name: 'NOME_EMPRESA' })
  nomeDaEmpresa: string;

  @Column({ type: 'varchar', name: 'CONSUMO' })
  consumoKwh: number;

  @ManyToOne((type) => Propostas, (proposta) => proposta.cargas)
  proposta: Propostas;
}
