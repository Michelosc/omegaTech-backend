import { Guid } from 'guid-typescript';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from './cargas.model';
import { Usuarios } from './usuarios.model';
@Entity({ name: 'PROPOSTAS' })
export class Propostas {
  @PrimaryColumn({ type: 'int', name: 'ID' })
  id: number;

  @Column({ type: 'uuid', name: 'ID_PUBLICO' })
  idPublico: Guid;

  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: Date;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: Date;

  @OneToMany((type) => Cargas, (cargas) => cargas.proposta)
  cargas: Cargas;

  @Column({ type: 'enum', enum: Submercado })
  submercado: Submercado;

  @Column({ type: 'enum', enum: FonteDeEnergia })
  fonteDeEnergia: FonteDeEnergia;

  @Column({ type: 'numeric', name: 'CONSUMO_TOTAL' })
  consumoTotal: string;

  @Column({ type: 'boolean', name: 'CONTRATADO' })
  contratado: boolean;

  @ManyToOne((type) => Usuarios, (usuario) => usuario.propostas)
  usuario: Usuarios;
}
