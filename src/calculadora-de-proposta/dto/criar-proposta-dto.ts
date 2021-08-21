import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, MinDate } from 'class-validator';
import { FonteDeEnergia } from '../enums/fonte-de-energia.enum';
import { Submercado } from '../enums/submercado.enum';
import { Cargas } from '../models/cargas.model';

export class CriarPropostaDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Data inicial para contratação de proposta',
    type: () => Date,
  })
  dataInicio: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Data final para contratação de proposta',
    type: () => Date,
  })
  dataFim: Date;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Cargas para serem contratadas',
    type: () => String,
  })
  cargas: Cargas[];

  @IsNotEmpty()
  @IsEnum(Submercado)
  @ApiProperty({
    description: 'Região da contratação',
    type: () => String,
  })
  submercado: Submercado;

  @IsNotEmpty()
  @IsEnum(FonteDeEnergia)
  @ApiProperty({
    description: 'Tipo de fonte de energia a ser contratada',
    type: () => String,
  })
  fonteDeEnergia: FonteDeEnergia;
}
