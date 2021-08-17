import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarCargasDto } from '../dto/criar-cargas-dto';
import { Cargas } from '../models/cargas.model';

@Injectable()
export class CargasService {
  constructor(
    @InjectRepository(Cargas) private repository: Repository<Cargas>,
  ) {}

  findAll(): Promise<Cargas[]> {
    return this.repository.find();
  }

  async add(dto: CriarCargasDto) {
    const { nomeDaEmpresa, consumoKwh } = dto;

    const carga = this.repository.create({ nomeDaEmpresa, consumoKwh });

    await this.repository.save(carga);
  }
}
