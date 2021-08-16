import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculadoraDePropostaModule } from './calculadora-de-proposta/calculadora-de-proposta.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CalculadoraDePropostaModule, AuthModule],
})
export class AppModule {}
