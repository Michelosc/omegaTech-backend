import { Guid } from 'guid-typescript';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from './cargas.model';
import { Usuarios } from './usuarios.model';

export class Propostas {
  id: string;
  idPublico: Guid;
  dataInicio: Date;
  dataFim: Date;
  cargas: Cargas;
  submercado: Submercado;
  fonteDeEnergia: FonteDeEnergia;
  consumoTotal: string;
  contratado: boolean;
  usuario: Usuarios;
}
