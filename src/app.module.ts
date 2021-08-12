import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuario/usuarios.module';
import { PropostasModule } from './propostas/propostas.module';

@Module({
  imports: [UsuariosModule, PropostasModule],
})
export class AppModule {}
