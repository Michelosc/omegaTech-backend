import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostasController } from './controllers/propostas.controller';
import { Cargas } from './models/cargas.model';
import { Propostas } from './models/propostas.model';
import { Usuarios } from '../auth/models/usuarios.model';
import { PropostasService } from './services/propostas.service';
import { CargasController } from './controllers/cargas.controller';
import { CargasService } from './services/cargas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cargas, Propostas])],
  controllers: [PropostasController, CargasController],
  providers: [PropostasService, CargasService],
})
export class CalculadoraDePropostaModule {}
