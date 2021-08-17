import { Body, Get, Post } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Propostas } from '../models/propostas.model';
import { PropostasService } from '../services/propostas.service';

@Controller('propostas')
export class PropostasController {
  constructor(private service: PropostasService) {}

  @Get()
  GetAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  GetById(@Param('id') id: string): Promise<Propostas> {
    return this.service.findOne(id);
  }

  @Post()
  add(@Body() dto: CriarPropostaDto) {
    return this.service.add(dto);
  }
}
