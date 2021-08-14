import { Guid } from 'guid-typescript';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Propostas } from './propostas.model';

@Entity({ name: 'TB_CARGAS' })
export class Cargas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  public id: number;

  @Column({ type: 'varchar', name: 'NOME_EMPRESA' })
  public nomeDaEmpresa: string;

  @Column({ type: 'numeric', name: 'CONSUMO' })
  public consumoKwh: number;

  @ManyToOne((type) => Propostas, (proposta) => proposta.cargas)
  public proposta: Propostas;

  constructor(nomeDaEmpresa: string, consumoKwh: number) {
    this.nomeDaEmpresa = nomeDaEmpresa;
    this.consumoKwh = consumoKwh;
  }

  get NomeDaEmpresa() {
    return this.nomeDaEmpresa;
  }

  get ConsumoKwh() {
    return this.consumoKwh;
  }
}
