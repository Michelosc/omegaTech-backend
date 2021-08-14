import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { PropostasService } from '../services/propostas.service';

@Controller('propostas')
export class PropostasController {
  constructor(private service: PropostasService) {}

  @Get()
  GetAll() {
    return this.service.findAll();
  }

  @Post()
  add(@Body() dto: CriarPropostaDto) {
    return this.service.add(dto);
  }
}
