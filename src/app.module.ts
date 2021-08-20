import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalculadoraDePropostaModule } from './calculadora-de-proposta/calculadora-de-proposta.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRoot(),
    CalculadoraDePropostaModule,
    AuthModule,
  ],
})
export class AppModule {}
