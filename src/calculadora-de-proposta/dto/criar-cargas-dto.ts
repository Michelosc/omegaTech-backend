import { ApiProperty } from '@nestjs/swagger';

export class CriarCargasDto {
  @ApiProperty({
    description: 'Nome da empresa para contratar proposta',
    type: () => String,
  })
  nomeDaEmpresa: string;
  @ApiProperty({
    description: 'Consumo de energia da empresa',
    type: () => Number,
  })
  consumoKwh: number;
}
