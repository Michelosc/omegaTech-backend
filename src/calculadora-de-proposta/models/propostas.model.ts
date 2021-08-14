import { Guid } from 'guid-typescript';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from './cargas.model';
import { Usuarios } from './usuarios.model';

export class Propostas {
  id: string;
  id_publico: Guid;
  dataInicio: Date;
  dataFim: Date;
  carga: Cargas;
  submercado: Submercado;
  fonteDeEnergia: FonteDeEnergia;
  status: boolean;
  usuario: Usuarios;
}
