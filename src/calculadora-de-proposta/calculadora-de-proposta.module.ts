import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostasModule } from './modules/propostas.module';
import { UsuariosModule } from './modules/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature(), UsuariosModule, PropostasModule],
})
export class CalculadoraDePropostaModule {}
