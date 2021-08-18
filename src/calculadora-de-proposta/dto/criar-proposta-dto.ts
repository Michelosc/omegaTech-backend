import { IsDateString, IsEnum, IsNotEmpty, MinDate } from 'class-validator';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from '../models/cargas.model';

export class CriarPropostaDto {
  @IsNotEmpty()
  @IsDateString()
  dataInicio: Date;

  @IsNotEmpty()
  @IsDateString()
  dataFim: Date;

  @IsNotEmpty()
  cargas: Cargas[];

  @IsNotEmpty()
  @IsEnum(Submercado)
  submercado: Submercado;

  @IsNotEmpty()
  @IsEnum(FonteDeEnergia)
  fonteDeEnergia: FonteDeEnergia;
}
