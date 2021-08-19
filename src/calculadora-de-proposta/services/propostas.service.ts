import {
  BadRequestException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CriarPropostaDto } from '../dto/criar-proposta-dto';
import { Cargas } from '../models/cargas.model';
import { Propostas } from '../models/propostas.model';
import * as moment from 'moment';
import { Usuarios } from 'src/auth/models/usuarios.model';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Propostas) private repository: Repository<Propostas>,
  ) {}

  async findAllPropostas(): Promise<Propostas[]> {
    return await this.repository.find({ order: { id: 'DESC' } });
  }

  async getPropostas(idPublico: string): Promise<Propostas> {
    const encontrado = await this.repository.findOne({ idPublico });
    if (!encontrado) {
      throw new NotFoundException(`Proposta de ID${idPublico} não existe.`);
    }
    return encontrado;
  }

  async add(dto: CriarPropostaDto, usuario: Usuarios): Promise<Propostas> {
    const proposta = new Propostas(
      dto.dataInicio,
      dto.dataFim,
      dto.fonteDeEnergia,
      dto.submercado,
    );

    proposta.usuario = usuario;

    const cargasDoDto = dto.cargas;

    const carga: Cargas[] = [];

    for (let i = 0; i < cargasDoDto.length; i++) {
      const cargaDoRepositorio = await getRepository(Cargas).find({
        nomeDaEmpresa: `${cargasDoDto[i].nomeDaEmpresa}`,
      });

      if (cargaDoRepositorio.length <= 0) {
        throw new NotFoundException(
          `Carga inexistente favor informar uma carga válida`,
        );
      }

      carga.push(cargaDoRepositorio[0]);
    }

    const verificaDataInico = moment().isAfter(dto.dataInicio);

    if (verificaDataInico) {
      throw new BadRequestException(
        'Data início deve ser maior que a data atual',
      );
    }

    if (dto.dataFim < dto.dataInicio) {
      throw new BadRequestException('Data fim deve ser maior que data início');
    }

    proposta.cargas = [...carga];

    proposta.defineConsumoTotal();

    return await this.repository.manager.save(proposta);
  }

  async update(idPublico: string, contratado: boolean): Promise<Propostas> {
    const proposta = await this.getPropostas(idPublico);
    if (proposta.contratado) {
      throw new MethodNotAllowedException(
        'A proposta não pode ser contratada pois já está contratada.',
      );
    }
    proposta.contratado = contratado;
    await this.repository.save(proposta);
    return proposta;
  }

  async remove(idPublico: string): Promise<void> {
    const resultado = await this.getPropostas(idPublico);
    if (resultado.contratado) {
      throw new MethodNotAllowedException(
        'A proposta não pode ser excluída pois está contratada.',
      );
    }
    await this.repository.remove(resultado);
  }
}
