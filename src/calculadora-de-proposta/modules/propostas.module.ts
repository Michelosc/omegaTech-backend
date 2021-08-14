import { Module } from '@nestjs/common';
import { PropostasController } from '../controllers/propostas.controller';
import { PropostasService } from '../services/propostas.service';

@Module({
  controllers: [PropostasController],
  providers: [PropostasService],
})
export class PropostasModule {}
