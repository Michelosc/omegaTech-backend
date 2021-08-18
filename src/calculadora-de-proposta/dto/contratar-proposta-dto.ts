import { IsNotEmpty } from 'class-validator';

export class ContratarPropostaDto {
  @IsNotEmpty()
  contratado: boolean;
}
