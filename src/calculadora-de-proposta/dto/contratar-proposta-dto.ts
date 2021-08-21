import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ContratarPropostaDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Campo para cofirmação de contratação de proposta',
    type: () => Boolean,
  })
  contratado: boolean;
}
