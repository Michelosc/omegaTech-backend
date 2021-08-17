import { Body, Delete, Get, Post } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ContratarPropostaDto } from '../dto/contratar-proposta-dto';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Propostas } from '../models/propostas.model';
import { PropostasService } from '../services/propostas.service';

@Controller('propostas')
export class PropostasController {
  constructor(private service: PropostasService) {}

  @Get()
  getAll() {
    return this.service.findAllPropostas();
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Propostas> {
    return this.service.getPropostas(id);
  }

  @Post()
  add(@Body() dto: CriarPropostaDto) {
    return this.service.add(dto);
  }

  @Patch('/:id')
  contratar(@Param('id') idPublico: string, @Body() dto: ContratarPropostaDto) {
    const { contratado } = dto;

    return this.service.update(idPublico, contratado);
  }

  @Delete('/:id')
  remover(@Param('id') idPublico: string) {
    return this.service.remove(idPublico);
  }
}
