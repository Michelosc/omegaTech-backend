import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Repository } from 'typeorm';
import { ContratarPropostaDto } from '../dto/contratar-proposta-dto';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Cargas } from '../models/cargas.model';
import { Propostas } from '../models/propostas.model';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Propostas) private repository: Repository<Propostas>,
  ) {}

  async findAllPropostas(): Promise<Propostas[]> {
    return await this.repository.find();
  }

  async getPropostas(idPublico: string): Promise<Propostas> {
    const encontrado = await this.repository.findOne({ idPublico });
    if (!encontrado) {
      throw new NotFoundException(`Proposta de ID${idPublico} não existe.`);
    }
    return encontrado;
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
      const c = await getRepository(Cargas).find({
        nomeDaEmpresa: `${cargas[i].nomeDaEmpresa}`,
      });

      if (c.length <= 0) {
        throw new NotFoundException(
          `Carga inexistente favor informar uma carga válida`,
        );
      }
      carga.push(c[0]);
    }

    proposta.cargas = [...carga];

    return await this.repository.manager.save(proposta);
  }

  async update(idPublico: string, contratado: boolean): Promise<Propostas> {
    const proposta = await this.getPropostas(idPublico);

    proposta.contratado = contratado;
    await this.repository.save(proposta);
    return proposta;
  }

  async remove(idPublico: string): Promise<void> {
    const resultado = await this.getPropostas(idPublico);
    await this.repository.remove(resultado);
  }
}
