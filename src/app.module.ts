import { Module } from '@nestjs/common';
import { CalculadoraDePropostaModule } from './calculadora-de-proposta/calculadora-de-proposta.module';

@Module({
  imports: [CalculadoraDePropostaModule],
})
export class AppModule {}
