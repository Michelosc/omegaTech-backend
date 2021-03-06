import { Body, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Usuarios } from 'src/auth/models/usuarios.model';
import { ContratarPropostaDto } from '../dto/contratar-proposta-dto';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Propostas } from '../models/propostas.model';
import { PropostasService } from '../services/propostas.service';

@UseGuards(AuthGuard())
@Controller('propostas')
export class PropostasController {
  constructor(private service: PropostasService) {}

  @Get()
  getAll(@GetUser() usuario: Usuarios) {
    return this.service.findAllPropostas(usuario);
  }

  @Get('/:id')
  getById(
    @Param('id') id: string,
    @GetUser() usuario: Usuarios,
  ): Promise<Propostas> {
    return this.service.getPropostas(id, usuario);
  }

  @Post()
  add(
    @Body() dto: CriarPropostaDto,
    @GetUser() usuario: Usuarios,
  ): Promise<Propostas> {
    return this.service.add(dto, usuario);
  }

  @Patch('/:id')
  contratar(
    @Param('id') idPublico: string,
    @Body() dto: ContratarPropostaDto,
    @GetUser() usuario: Usuarios,
  ) {
    const { contratado } = dto;

    return this.service.update(idPublico, contratado, usuario);
  }

  @Delete('/:id')
  remover(@Param('id') idPublico: string, @GetUser() usuario: Usuarios) {
    return this.service.remove(idPublico, usuario);
  }
}
