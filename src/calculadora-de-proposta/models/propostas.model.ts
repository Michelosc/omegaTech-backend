import { Guid } from 'guid-typescript';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from './cargas.model';
import { Usuarios } from './usuarios.model';
@Entity({ name: 'TB_PROPOSTAS' })
export class Propostas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID' })
  public id: number;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  public idPublico: string;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  public dataInicio: Date;

  @Column({ type: 'date', name: 'DATA_FIM' })
  public dataFim: Date;

  @OneToMany((type) => Cargas, (cargas) => cargas.proposta)
  public cargas: Cargas[];

  @Column({ type: 'enum', enum: Submercado, name: 'SUBMERCADO' })
  public submercado: Submercado;

  @Column({ type: 'enum', enum: FonteDeEnergia, name: 'FONTE_DE_ENERGIA' })
  public fonteDeEnergia: FonteDeEnergia;

  @Column({ type: 'numeric', name: 'CONSUMO_TOTAL' })
  public consumoTotal: number;

  @Column({ type: 'boolean', name: 'CONTRATADO' })
  public contratado: boolean;

  @ManyToOne((type) => Usuarios, (usuario) => usuario.propostas)
  public usuario: Usuarios;

  constructor(
    dataInicio: Date,
    dataFim: Date,
    cargas: Cargas[],
    fonteDeEnergia: FonteDeEnergia,
    submercado: Submercado,
  ) {
    this.idPublico = Guid.create().toString();
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.cargas = cargas;
    this.fonteDeEnergia = fonteDeEnergia;
    this.submercado = submercado;
    this.contratado = false;
    this.consumoTotal = 0;
  }

  defineConsumoTotal(value: number) {
    this.consumoTotal = value;
  }
}
