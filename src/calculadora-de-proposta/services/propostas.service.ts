import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Propostas } from '../models/propostas.model';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Propostas) private repository: Repository<Propostas>,
  ) {}

  findAll() {}

  add(dto: CriarPropostaDto) {
    // const proposta = new Propostas(
    //   dto.dataInicio,
    //   dto.dataFim,
    //   dto.carga,
    //   dto.fonteDeEnergia,
    //   dto.submercado,
    // );
    // this.repository.save(CotratarPropostaDto);
  }
}
