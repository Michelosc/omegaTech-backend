import { Guid } from 'guid-typescript';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from './cargas.model';
import { Usuarios } from '../../auth/models/usuarios.model';
import * as moment from 'moment';
@Entity({ name: 'TB_PROPOSTAS' })
export class Propostas {
  @PrimaryGeneratedColumn({ name: 'ID' })
  public id: string;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  public idPublico: string;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  public dataInicio: Date;

  @Column({ type: 'date', name: 'DATA_FIM' })
  public dataFim: Date;

  @ManyToMany((type) => Cargas, (cargas) => cargas.propostas, {
    eager: true,
  })
  @JoinTable()
  public cargas: Cargas[];

  @Column({ type: 'enum', enum: Submercado, name: 'SUBMERCADO' })
  public submercado: Submercado;

  @Column({ type: 'enum', enum: FonteDeEnergia, name: 'FONTE_DE_ENERGIA' })
  public fonteDeEnergia: FonteDeEnergia;

  @Column({ type: 'numeric', name: 'CONSUMO_TOTAL' })
  public consumoTotal: number;

  @Column({ type: 'boolean', name: 'CONTRATADO' })
  public contratado: boolean;

  constructor(
    dataInicio: Date,
    dataFim: Date,
    fonteDeEnergia: FonteDeEnergia,
    submercado: Submercado,
  ) {
    this.idPublico = Guid.create().toString();
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    this.fonteDeEnergia = fonteDeEnergia;
    this.submercado = submercado;
    this.contratado = false;
    this.consumoTotal = 0;
  }

  defineConsumoTotal(): void {
    let consumoTotalDasCargas = 0;
    this.cargas.map((c) => {
      consumoTotalDasCargas += +c.consumoKwh;
    });
    console.log(consumoTotalDasCargas);
    const dataInicio = moment(this.dataInicio);
    const dataFim = moment(this.dataFim);
    const totalDeHoras = dataFim.diff(dataInicio, 'hours');
    console.log(totalDeHoras);
  }
}
