import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostasController } from './controllers/propostas.controller';
import { UsuariosController } from './controllers/usuarios.controller';
import { Cargas } from './models/cargas.model';
import { Propostas } from './models/propostas.model';
import { Usuarios } from './models/usuarios.model';
import { PropostasService } from './services/propostas.service';
import { UsuariosService } from './services/usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cargas, Usuarios, Propostas])],
  controllers: [UsuariosController, PropostasController],
  providers: [UsuariosService, PropostasService],
})
export class CalculadoraDePropostaModule {}
