import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Cargas } from '../models/cargas.model';
import { Propostas } from '../models/propostas.model';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Propostas) private repository: Repository<Propostas>,
  ) {}

  findAll(): Promise<Propostas[]> {
    return this.repository.find();
  }

  add(dto: CriarPropostaDto) {
    const cargas: Cargas[] = dto.cargas;
    const cargasArray: Cargas[] = [];

    cargas.map((c) => {
      const nomeDaEmpresa = c.nomeDaEmpresa;
      const consumoKwh = c.consumoKwh;
      const carga = new Cargas(nomeDaEmpresa, consumoKwh);
      cargasArray.push(carga);
    });
    const proposta = new Propostas(
      dto.dataInicio,
      dto.dataFim,
      cargasArray,
      dto.fonteDeEnergia,
      dto.submercado,
    );
    let total = 0;
    cargasArray.map((c) => {
      total += c.ConsumoKwh;
    });
    proposta.defineConsumoTotal(total);
    this.repository.save(proposta);
    return proposta;
  }
}
