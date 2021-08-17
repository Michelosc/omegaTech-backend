import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import console from 'node:console';
import { getConnection, getRepository, Repository } from 'typeorm';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Cargas } from '../models/cargas.model';
import { Propostas } from '../models/propostas.model';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Propostas) private repository: Repository<Propostas>,
  ) {}

  async findAll(): Promise<Propostas[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Propostas> {
    const p = await this.repository.findOne({ id });

    return p;
  }

  async add(dto: CriarPropostaDto): Promise<Propostas> {
    const proposta = new Propostas(
      dto.dataInicio,
      dto.dataFim,
      dto.fonteDeEnergia,
      dto.submercado,
    );

    const cargas = dto.cargas;

    const carga: Cargas[] = [];

    for (let i = 0; i < cargas.length; i++) {
      let c = await getRepository(Cargas).find({
        nomeDaEmpresa: `${cargas[i].nomeDaEmpresa}`,
      });
      carga.push(c[0]);
    }

    proposta.cargas = [...carga];

    return await this.repository.manager.save(proposta);
  }
}
