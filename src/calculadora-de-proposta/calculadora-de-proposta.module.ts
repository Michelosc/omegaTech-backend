import { Module } from '@nestjs/common';
import { PropostasModule } from './modules/propostas.module';
import { UsuariosModule } from './modules/usuarios.module';

@Module({
  imports: [UsuariosModule, PropostasModule],
})
export class CalculadoraDePropostaModule {}
