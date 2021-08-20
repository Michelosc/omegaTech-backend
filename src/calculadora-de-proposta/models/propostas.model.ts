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
import { Exclude } from 'class-transformer';
@Entity({ name: 'TB_PROPOSTAS' })
export class Propostas {
  @Exclude({ toPlainOnly: true })
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

  @Column({ type: 'numeric', name: 'VALOR_DA_PROPOSTA' })
  public valorDaProposta: number;

  @ManyToOne((type) => Usuarios, (usuarios) => usuarios.propostas, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  public usuario: Usuarios;

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
    this.valorDaProposta = 0;
  }

  defineConsumoTotal(): void {
    let consumoTotalDasCargas = 0;
    this.cargas.map((c) => {
      consumoTotalDasCargas += +c.consumoKwh;
    });

    this.consumoTotal = consumoTotalDasCargas;

    const dataInicio = moment(this.dataInicio);
    const dataFim = moment(this.dataFim);
    const totalDeHoras = dataFim.diff(dataInicio, 'hours');
    const tempoDeContrato = dataFim.diff(dataInicio, 'years');

    let taxaSubmercado: number = 0;

    const precoKw = 10;

    switch (this.submercado) {
      case 'NORTE':
        taxaSubmercado = 2;
        break;

      case 'NORDESTE':
        taxaSubmercado = -1;
        break;

      case 'SUL':
        taxaSubmercado = 3.5;
        break;

      case 'SUDESTE':
        taxaSubmercado = 1.5;
        break;

      case 'CENTROOESTE':
        taxaSubmercado = 1.5;
        break;
    }

    let taxaFonteDeEnergia: number = 0;

    switch (this.fonteDeEnergia) {
      case 'CONVENCIONAL':
        taxaFonteDeEnergia = 5;
        break;

      case 'RENOVAVEL':
        taxaFonteDeEnergia = -2;
        break;
    }

    const valorTotal =
      +consumoTotalDasCargas *
      +totalDeHoras *
      (+precoKw + (+taxaSubmercado + +taxaFonteDeEnergia));

    const incentivo = tempoDeContrato - 3;

    if (tempoDeContrato > 3) {
      this.valorDaProposta = (valorTotal / 100) * incentivo;
      return;
    }

    this.valorDaProposta = valorTotal;
  }
}
