import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculadoraDePropostaModule } from './calculadora-de-proposta/calculadora-de-proposta.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CalculadoraDePropostaModule],
})
export class AppModule {}
