import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from '../models/cargas.model';

export class CriarPropostaDto {
  dataInicio: Date;
  dataFim: Date;
  cargas: Cargas[];
  submercado: Submercado;
  fonteDeEnergia: FonteDeEnergia;
}
