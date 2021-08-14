import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propostas } from '../models/propostas.model';

@Injectable()
export class PropostasService {
  constructor(
    @InjectRepository(Propostas) private repository: Repository<Propostas>,
  ) {}

  findAll() {}
}
